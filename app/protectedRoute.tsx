import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { useAuth } from "./config/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Si ya estamos en la pantalla de login, no redirigir nuevamente
      if (pathname !== "/loggin") {
        //router.replace("/loggin"); // -->
      }
    }
  }, [loading, user, pathname, router]);

  if (!user) {
    // si cambias la logica por la constante loding da el error que menciono por
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#235025" />
        <Text style={styles.text}>Inicia Sesion para esta Función...</Text>
      </View>
    );
  }

  //return user ? <>{children}</> : null;
  return <>{children}</>;
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
