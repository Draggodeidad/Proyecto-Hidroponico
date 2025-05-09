import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "./config/firebaseConfig";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const RegisterScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleV, setIsPasswordVisibleV] = useState(false);

  const auth = getAuth();

  const handleSignUp = async () => {
    // Resetear error previo
    setError("");

    // Validaciones básicas
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      // Crear usuario con email y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Guardar información adicional del usuario en Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        fullName,
        email,
        createdAt: new Date().toISOString(),
      });

      // Restablecer carga
      setLoading(false);

      // Si todo salió bien, mostrar mensaje y redirigir
      Alert.alert(
        "Registro exitoso",
        "Tu cuenta ha sido creada correctamente",
        [
          {
            text: "OK",
            onPress: () => router.push("/loggin"), // Redirigir al usuario después de aceptar la alerta
          },
        ]
      );
    } catch (error: any) {
      setLoading(false);

      // Manejar errores específicos de Firebase
      let errorMessage = "Ha ocurrido un error durante el registro";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Este correo electrónico ya está registrado";
          break;
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico es inválido";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es demasiado débil";
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
      <Text style={styles.title}>Registrar Cuenta</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
      />

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
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={!isPasswordVisible} //verificar si la contraseña es registrada, el valor anterior era true
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          activeOpacity={0.8}
        >
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"} // Cambia el icono
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry={!isPasswordVisibleV} //lo mismo aca
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsPasswordVisibleV(!isPasswordVisibleV)}
          activeOpacity={0.8}
        >
          <Feather
            name={isPasswordVisibleV ? "eye" : "eye-off"} // Cambia el icono
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push("/loggin")}
      >
        <Text style={styles.linkText}>
          ¿Ya tienes una cuenta? Iniciar sesión
        </Text>
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
    alignContent: "center",
  },
  inputContainer: {
    flexDirection: "column",
  },
  eyeButton: {
    alignSelf: "center",
    marginLeft: 2,
    position: "absolute",
    right: 10,
    padding: 2,
    top: 10,
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
});

export default RegisterScreen;
