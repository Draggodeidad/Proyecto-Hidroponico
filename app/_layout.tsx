import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// UI Kitten
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="ayuda"
            options={{
              // headerShown: false, // Quita el header
              // O si prefieres personalizarlo:

              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Ayuda",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="preferencias"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Preferencias",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="politicas"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Politicas de Privacidad",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="infocultivos"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "InfoCultivos",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="loggin"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Login",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Sign Up",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="cultivos/lechuga"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Lechuga",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />
            <Stack.Screen
            name="cultivos/fresas"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Fresas",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />

            <Stack.Screen
            name="cultivos/tomate"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Tomate",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />
          
          <Stack.Screen
            name="cultivos/albahaca"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Albahaca",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />

            <Stack.Screen
            name="cultivos/papas"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Papas",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />

            <Stack.Screen
            name="cultivos/pimientos"
            options={{
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#235025",
              headerTitle: "Pimientos",
              headerShadowVisible: false,
              headerTitleStyle: {
                color: "#235025",
                fontWeight: "bold",
              },
            }}
          />

        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ApplicationProvider>
  );
}
