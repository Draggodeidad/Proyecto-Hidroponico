import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "firebase/auth";

// Definimos la interfaz para la sesión de usuario
export interface UserSession {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Clave para almacenar la sesión del usuario
const USER_SESSION_KEY = "user_session";

// Guardar la sesión del usuario
export const saveUserSession = async (user: User): Promise<boolean> => {
  try {
    // Solo guardamos la información necesaria del usuario
    const userData: UserSession = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    await AsyncStorage.setItem(USER_SESSION_KEY, JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error("Error al guardar la sesión:", error);
    return false;
  }
};

// Obtener la sesión del usuario
export const getUserSession = async (): Promise<UserSession | null> => {
  try {
    const session = await AsyncStorage.getItem(USER_SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error("Error al recuperar la sesión:", error);
    return null;
  }
};

// Eliminar la sesión del usuario
export const removeUserSession = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(USER_SESSION_KEY);
    return true;
  } catch (error) {
    console.error("Error al eliminar la sesión:", error);
    return false;
  }
};

// Verificar si existe una sesión activa
export const isUserLoggedIn = async (): Promise<boolean> => {
  const user = await getUserSession();
  return user !== null;
};

export default {};
