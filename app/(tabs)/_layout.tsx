import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useKeyboard } from "@react-native-community/hooks";
import { useEffect } from "react";
import { router } from "expo-router";
import { getUserSession } from "../config/authService";
import ProtectedRoute from "../protectedRoute";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const keyboard = useKeyboard();
  // useEffect(() => {
  //   // Verificar si existe una sesión al iniciar la app
  //   const checkSession = async () => {
  //     const user = await getUserSession();

  //     // Si no hay sesión, mostrar pantalla de login
  //     if (!user) {
  //       router.replace("/loggin");
  //     } else {
  //       router.replace("/");
  //     }
  //   };

  //   checkSession();
  // }, []);
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "#FFFFFF",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: "#235025", // Color de fondo del navbar
          display: keyboard.keyboardShown ? "none" : "flex",
        },
      }}
    >
      <Tabs.Screen
        name="index" // archivo donde va la pantalla monitoreo.tsx
        options={{
          title: "Monitoreo",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="informacion" // index.tsx
        options={{
          title: "Info",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="seedling" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inteligenciaArtificial" //inteligenciaArtifical.tsx
        options={{
          title: "IA",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="robot" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracion" //configuracion.tsx
        options={{
          title: "Configuracion",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
