import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import {router} from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function ConfiguracionScreen() {
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

      {/* Inicio de Sesion */}
      <TouchableOpacity style={styles.signInContainer}>
        <Text style={styles.signInText}>Iniciar sesión o registrarse</Text>
        <FontAwesome name="sign-in" size={24} color="#235025" />
      </TouchableOpacity>
      {/* menu-Items */}
      <View style={styles.menuContainer}>
        {/* Donde comprar */}
        <View style={styles.menuItemWrapper}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <FontAwesome name="shopping-cart" size={24} color="#235025" />
            </View>
            <Text style={styles.menuText}>Dónde comprar</Text>
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
          <TouchableOpacity style={styles.menuItem}>
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
          onPress={() => router.push('/preferencias')}
          style={styles.menuItem}>
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
          <TouchableOpacity style={styles.menuItem}>
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
    //backgroundColor: "#fff",
    marginBottom: 20,
    gap: 15,
  },
  signInText: {
    fontSize: 18,
    color: "#235025",
    fontWeight: "500",
  },
  menuContainer: {
    marginTop: 65,
    paddingHorizontal: 16,
  },
  menuItemWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 18, // Esto agrega el espacio entre los items
    elevation: 2, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
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
