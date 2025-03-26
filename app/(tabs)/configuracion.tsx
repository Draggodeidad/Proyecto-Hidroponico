import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { getUserSession, removeUserSession } from "../config/authService";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { useAuth } from "../config/AuthContext";
import { styles } from "../styles/configuracion.styles";

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
        //console.log("User UID:", userSession.uid);
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
    const url = "hydrosmartdocs.netlify.app";
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
