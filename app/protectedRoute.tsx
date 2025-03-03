import React, { useEffect, useState, ReactNode } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import { isUserLoggedIn } from "./config/authService";

interface ProtectedRouteProps {
  children: ReactNode;
}

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedIn = await isUserLoggedIn();

        if (!loggedIn) {
          // Si no está autenticado, redirigir a la pantalla de login
          router.replace("/loggin");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        router.replace("/loggin");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#235025" />
        <Text style={styles.text}>Verificando autenticación...</Text>
      </View>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: "#235025",
  },
});

export default ProtectedRoute;
