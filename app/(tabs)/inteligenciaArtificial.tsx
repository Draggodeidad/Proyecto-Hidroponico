import React, { useState, useEffect } from "react";
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
import { useKeyboard } from "@react-native-community/hooks";
import Markdown from "react-native-markdown-display";
import ProtectedRoute from "../protectedRoute";
import { useMonitoring } from "../config/MonitoringContext";
import { useLocalSearchParams } from "expo-router";

export default function inteligenciaScreen() {
  const keyboard = useKeyboard();
  const [input, setInput] = useState("");
  const [userMessage, setUserMessage] = useState(""); // Mensaje del usuario
  const [aiResponse, setAiResponse] = useState(""); // Respuesta de la IA
  const [loading, setLoading] = useState(false);
  
  // Get monitoring data
  const { monitoringData } = useMonitoring();
  
  // Get route params
  const params = useLocalSearchParams();
  const [cropContext, setCropContext] = useState<any>(null);
  
  // Parse crop context from params if available
  useEffect(() => {
    if (params.cropContext) {
      try {
        const parsedContext = JSON.parse(params.cropContext as string);
        setCropContext(parsedContext);
        
        // Auto-generate a question if coming from crop page
        if (parsedContext.cropType) {
          const autoQuestion = `¿Cómo puedo cultivar ${parsedContext.cropTitle || parsedContext.cropType} con mis condiciones actuales?`;
          setInput(autoQuestion);
          // Don't auto-send here as it can cause infinite loops
        }
      } catch (e) {
        console.error("Error parsing crop context:", e);
      }
    }
  }, [params.cropContext]); // Only depend on params.cropContext, not the entire params object

  async function sendMessage(messageOverride?: string) {
    const messageToSend = messageOverride || input;
    
    if (!messageToSend.trim()) {
      return;
    }

    setUserMessage(messageToSend);
    setLoading(true);
    setAiResponse(""); // Limpiar respuesta anterior

    if (!messageOverride) {
      setInput("");
    }

    // Create a context string with the monitoring data
    const monitoringContextStr = `
Datos actuales del sistema hidropónico:
- pH: ${monitoringData.ph !== null ? monitoringData.ph.toFixed(1) : 'No disponible'}
- Temperatura: ${monitoringData.temperatura !== null ? `${monitoringData.temperatura.toFixed(1)}°C` : 'No disponible'}
- TDS: ${monitoringData.tds !== null ? monitoringData.tds.toFixed(1) : 'No disponible'}
- Turbidez: ${monitoringData.turbidez !== null ? monitoringData.turbidez.toFixed(1) : 'No disponible'}
- Tiempo activo del sistema: ${monitoringData.timeActive !== null ? monitoringData.timeActive : 'No disponible'}
`;

    // Add crop context if available
    const cropContextStr = cropContext ? `
Información del cultivo:
- Tipo: ${cropContext.cropType || 'No especificado'}
- Nombre: ${cropContext.cropTitle || 'No especificado'}
- Descripción: ${cropContext.cropDescription || 'No disponible'}
` : '';

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat:free",
            messages: [
              {
                role: "system",
                content: "Eres un experto en agricultura hidropónica. Utiliza los datos de monitoreo y la información del cultivo proporcionados para dar respuestas más precisas y personalizadas."
              },
              {
                role: "user",
                content: `${monitoringContextStr}${cropContextStr}\n\nConsulta del usuario: ${messageToSend}`
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      const markdownText =
        data.choices?.[0]?.message?.content || "Respuesta no recibida";
      setAiResponse(markdownText);
    } catch (error) {
      setAiResponse("Error al enviar el mensaje: " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 20}
        >
          {/* Aqui va el header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>HidroSmart</Text>
          </View>

          {/* Aqui van a ir los mensajes de la conversación */}
          <ScrollView
            style={styles.container}
            contentContainerStyle={[
              styles.scrollContent,
              keyboard.keyboardShown && {
                paddingBottom: keyboard.keyboardHeight,
              },
            ]}
          >
            {/* Mensaje Enviado del Usuario */}
            {userMessage && (
              <View style={styles.messageSendContainer}>
                <Text style={styles.bubbleSend}>{userMessage}</Text>
                <FontAwesome
                  name="user-circle"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
              </View>
            )}

            {/* Mensaje Recibido y Respuesta de la IA */}
            {loading ? (
              <View style={styles.messageReceivedContainer}>
                <FontAwesome
                  name="cogs"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
                <Text style={styles.bubbleReceived}>Cargando...</Text>
              </View>
            ) : aiResponse ? (
              <View style={styles.messageReceivedContainer}>
                <FontAwesome
                  name="cogs"
                  size={24}
                  color="black"
                  style={styles.icon}
                />
                <View style={styles.bubbleReceived}>
                  <Markdown>{aiResponse}</Markdown>
                </View>
              </View>
            ) : null}
          </ScrollView>

          {/* Aqui va el input de texto */}
          <View style={styles.inputContainer}>

            {/* Input */}
            <TextInput
              multiline
              placeholder="Escribe un mensaje"
              style={styles.input}
              value={input}
              onChangeText={setInput}
            />

            {/* Icono de Enviar */}
            <TouchableOpacity onPress={() => sendMessage()}>
              <Ionicons
                name="send"
                size={24}
                color={input.trim() ? "black" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ProtectedRoute>
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
  // contenedor del mensaje recibido
  messageReceivedContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 8,
  },
  // estilo de la burbuja
  bubbleReceived: {
    backgroundColor: "#C9E4CA",
    padding: 12,
    maxWidth: "80%",
    borderRadius: 16,
  },
  icon: {
    alignSelf: "flex-start",
    marginTop: 5,
    padding: 5,
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
