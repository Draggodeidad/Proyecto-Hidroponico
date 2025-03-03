import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { User } from "firebase/auth";
import {
  getUserSession,
  saveUserSession,
  removeUserSession,
  UserSession,
} from "./authService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Definimos la interfaz para el contexto de autenticación
interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props para el proveedor
interface AuthProviderProps {
  children: ReactNode;
}

// Componente proveedor del contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    // Verificar si hay una sesión guardada al iniciar
    const checkUserSession = async () => {
      try {
        const session = await getUserSession();
        if (session) {
          setUser(session);
        }
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
      } finally {
        setLoading(false);
      }
    };

    // Suscribirse a cambios en el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Usuario autenticado en Firebase
        const userData: UserSession = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };

        await saveUserSession(firebaseUser);
        setUser(userData);
      } else {
        // Usuario no autenticado
        await removeUserSession();
        setUser(null);
      }
      setLoading(false);
    });

    // Primero verificamos la sesión local
    checkUserSession();

    // Función de limpieza para evitar memory leaks
    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión
  const login = async (firebaseUser: User): Promise<void> => {
    try {
      setLoading(true);
      await saveUserSession(firebaseUser);

      const userData: UserSession = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };

      setUser(userData);
      setError(null);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await auth.signOut();
      await removeUserSession();
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setError("Error al cerrar sesión");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    error,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
