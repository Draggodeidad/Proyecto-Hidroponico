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

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="monitoreo" // archivo donde va la pantalla monitoreo.tsx
        options={{
          title: "Monitoreo",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart" size={28} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="index" // index.tsx
        options={{
          title: "Info",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="info-circle" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="inteligenciaArtificial" //inteligenciaArtifical.tsx
        options={{
          title: "IA",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="robot" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracion" //configuracion.tsx
        options={{
          title: "Configuracion",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={28} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
