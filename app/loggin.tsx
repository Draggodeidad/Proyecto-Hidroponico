import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import Feather from "@expo/vector-icons/Feather";
import { saveUserSession } from "./config/authService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // constantes para el show y hidden de la pswd
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const auth = getAuth();

  const handleLogin = async () => {
    // Resetear error previo
    setError("");

    // Validaciones básicas
    if (!email.trim() || !password) {
      setError("Por favor ingresa tu correo y contraseña");
      return;
    }

    try {
      setLoading(true);
      // Autenticar usuario con email y contraseña
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Guardar la sesión del usuario
      await saveUserSession(userCredential.user);

      setLoading(false);
      // Redirigir al home después de iniciar sesión exitosamente
      router.push("/");
    } catch (error: any) {
      setLoading(false);

      // Manejar errores específicos de Firebase
      let errorMessage = "Ha ocurrido un error durante el inicio de sesión";

      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico es inválido";
          break;
        case "auth/user-disabled":
          errorMessage = "Esta cuenta ha sido deshabilitada";
          break;
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta con este correo electrónico";
          break;
        case "auth/invalid-credential":
          errorMessage = "Contraseña incorrecta";
          break;
        case "auth/too-many-requests":
          errorMessage = "Demasiados intentos fallidos. Intenta más tarde";
          break;
        case "auth/network-request-failed":
          errorMessage = "Error de conexión. Verifica tu conexión a internet";
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }

      setError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HidroSmart</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputpws}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"} // Cambia el icono
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.linkText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "green",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "rgba(0, 128, 0, 0.5)",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "green",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",

    //borderBottomWidth: 1,

    //paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputpws: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    alignContent: "center",
  },
  eyeButton: {
    alignSelf: "center",
    marginLeft: 2,
  },
});

export default LoginScreen;
