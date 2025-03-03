import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { getUserSession, removeUserSession } from "../config/authService";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { useAuth } from "../config/AuthContext";

// Define la interfaz para el usuario
interface UserSession {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export default function ConfiguracionScreen() {
  // Define explícitamente el tipo de usuario
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();
  const [fullName, setFullName] = useState<string | null>(null);

  // Verificar sesión al cargar la pantalla
  useEffect(() => {
    const checkUserSession = async () => {
      const userSession = await getUserSession();
      setUser(userSession);
      setLoading(false);
      if (userSession && userSession.uid) {
        console.log("User UID:", userSession.uid);
        fetchFullName(userSession.uid);
      }
    };

    checkUserSession();
  }, []);

  const fetchFullName = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setFullName(userData.fullName || "Nombre no encontrado"); // Asigna fullName o un mensaje
      } else {
        setFullName("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener fullName:", error);
      setFullName("Error al cargar el nombre");
    }
  };

  const handleLogout = async () => {
    try {
      // Cerrar sesión en Firebase
      await signOut(auth);

      // Limpiar sesión
      //AsyncStorage.clear()
      await removeUserSession();

      // Actualizar el estado
      setUser(null);

      // Navegar explícitamente
      //router.replace("/loggin");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar la sesión");
    }
  };
  const { logout } = useAuth();
  const handlePress = () => {
    const url = "https://www.youtube.com/";
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HidroSmart</Text>
        {/* Campanita para las notificaciones */}
        <TouchableOpacity style={{}}>
          <FontAwesome name="bell" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Perfil de Usuario o Botón de Inicio de Sesión */}
      {loading ? (
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Cargando...</Text>
        </View>
      ) : user ? (
        <View style={styles.userProfileContainer}>
          <View style={styles.userInfoContainer}>
            <FontAwesome name="user-circle" size={40} color="#235025" />
            <View style={styles.userTextContainer}>
              <Text style={styles.userNameText}>{fullName}</Text>
              <Text style={styles.userEmailText}>
                {user.displayName || user.email}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            <FontAwesome name="sign-out" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.signInContainer}
          onPress={() => router.push("/loggin")}
        >
          <Text style={styles.signInText}>Iniciar sesión o registrarse</Text>
          <FontAwesome name="sign-in" size={24} color="#235025" />
        </TouchableOpacity>
      )}

      {/* menu-Items */}
      <View style={styles.menuContainer}>
        {/* Manuales */}
        <View style={styles.menuItemWrapper}>
          <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
            <View style={styles.menuIconContainer}>
              <FontAwesome5 name="book-open" size={24} color="#235025" />
            </View>
            <Text style={styles.menuText}>Manuales</Text>
            <FontAwesome
              name="angle-right"
              size={24}
              color="#90a955"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        {/* Politica */}
        <View style={styles.menuItemWrapper}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/politicas")}
          >
            <View style={styles.menuIconContainer}>
              <FontAwesome name="file-text" size={24} color="#235025" />
            </View>
            <Text style={styles.menuText}>Política de privacidad</Text>
            <FontAwesome
              name="angle-right"
              size={24}
              color="#90a955"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
        {/* Preferencias */}
        <View style={styles.menuItemWrapper}>
          <TouchableOpacity
            onPress={() => router.push("/preferencias")}
            style={styles.menuItem}
          >
            <View style={styles.menuIconContainer}>
              <FontAwesome name="cog" size={24} color="#235025" />
            </View>
            <Text style={styles.menuText}>Preferencias</Text>
            <FontAwesome
              name="angle-right"
              size={24}
              color="#90a955"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Ayuda */}
        <View style={styles.menuItemWrapper}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/ayuda")}
          >
            <View style={styles.menuIconContainer}>
              <FontAwesome name="question-circle" size={24} color="#235025" />
            </View>
            <Text style={styles.menuText}>Ayuda</Text>
            <FontAwesome
              name="angle-right"
              size={24}
              color="#90a955"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version: 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#235025",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  notificationIcon: {
    padding: 8,
  },
  signInContainer: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
    gap: 15,
  },
  signInText: {
    fontSize: 18,
    color: "#235025",
    fontWeight: "500",
  },
  userProfileContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  userTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#235025",
  },
  userEmailText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#235025",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    gap: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  menuContainer: {
    marginTop: 25,
    paddingHorizontal: 16,
  },
  menuItemWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  menuIconContainer: {
    width: 40,
    alignItems: "center",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#235025",
    marginLeft: 10,
  },
  arrowIcon: {
    marginLeft: "auto",
  },
  versionContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  versionText: {
    color: "#666",
    fontSize: 14,
  },
});
