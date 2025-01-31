import React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function inteligenciaScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Aqui va el header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>HidroSmart</Text>
        </View>

        {/* Aqui van a ir los mensajes de la conversación */}
        <ScrollView style={styles.container}>
          {/* Mensaje Enviado */}
          <View style={styles.messageSendContainer}>
            <Text style={styles.bubbleSend}>Hola Mundo....</Text>
            <FontAwesome
              name="user-circle"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>

          {/* Mensaje Recibido */}
          <View style={styles.messageReceivedContainer}>
            <FontAwesome
              name="cogs"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.bubbleReceived}>Hola Mundo....</Text>
          </View>
        </ScrollView>

        {/* Aqui va el input de texto */}
        <View style={styles.inputContainer}>
          {/* Icono subir archivos */}
          <TouchableOpacity>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>

          {/* Input */}
          <TextInput placeholder="Escribe un mensaje" style={styles.input} />

          {/* Icono de Enviar */}
          <TouchableOpacity>
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // estilo global
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  // estilo del header
  header: {
    //marginTop: 20,
    padding: 20,
    backgroundColor: "#235025",
    alignItems: "center",
  },
  // texto dentro del header
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  // contenedor de los mensajes
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  //
  scrollContent: {
    padding: 10,
    flexGrow: 1,
  },
  // contenedor del mensaje enviado
  messageSendContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 5,
  },
  // estilo de la burbuja
  bubbleSend: {
    backgroundColor: "#90a955",
    padding: 12,
    maxWidth: "80%",
    borderRadius: 16,
  },
  // contenedor del mensaje recivido
  messageReceivedContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5,
  },
  // estilo de la burbuja
  bubbleReceived: {
    backgroundColor: "#C9E4CA",
    padding: 12,
    maxWidth: "80%",
    borderRadius: 16,
  },
  icon: {
    marginHorizontal: 8,
  },
  // contenedor del input
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  // estilo del input
  input: {
    flex: 1,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    fontSize: 16,
  },
});
