import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { Toggle, ToggleProps, Input } from "@ui-kitten/components";
import { getDatabase, ref, onValue, off, set } from "firebase/database";
import { database } from "../config/firebaseConfig";
import { useAuth } from "../config/AuthContext";
import ProtectedRoute from "../protectedRoute";
import { styles } from "../styles/index.styles";

export default function Monitoreo() {
  const [ph, setPh] = useState<number | null>(null);
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [timeActive, setTimeActive] = useState<number | null>(null);
  const [tds, setTds] = useState<number | null>(null);
  const [turbidez, setTurbidez] = useState<number | null>(null);
  const [pumpStatus, setPumpStatus] = useState<boolean>(false);
  const [pumpScheduleActive, setPumpScheduleActive] = useState<boolean>(false);
  const [pumpInterval, setPumpInterval] = useState<string>("");

  useEffect(() => {
    // Crear referencias usando la instancia de database importada
    const phRef = ref(database, "/monitoreo/ph");
    const temperaturaRef = ref(database, "/monitoreo/temperatura");
    const timeActiveRef = ref(database, "/monitoreo/ultima_actualizacion");
    const tdsRef = ref(database, "/monitoreo/tds");
    const turbidezRef = ref(database, "/monitoreo/turbidez");
    const pumpStatusRef = ref(database, "/monitoreo/bomba_estado");
    const pumpScheduleRef = ref(database, "/monitoreo/bomba_programada");
    const pumpIntervalRef = ref(database, "/monitoreo/bomba_intervalo");

    // Suscribirse a cambios en el pH
    onValue(phRef, (snapshot) => {
      const phValue = snapshot.val();
      setPh(phValue);
      setLastUpdate(new Date().toLocaleTimeString());
    });

    // Suscribirse a cambios en la temperatura
    onValue(temperaturaRef, (snapshot) => {
      const tempValue = snapshot.val();
      setTemperatura(tempValue);
      setLastUpdate(new Date().toLocaleTimeString());
    });

    // Suscribirse a cambios en el tiempo activo
    onValue(timeActiveRef, (snapshot) => {
      const timeActiveValue = snapshot.val();
      setTimeActive(timeActiveValue);
      setLastUpdate(new Date().toLocaleTimeString());
    });

    // Suscribirse a cambios tds
    onValue(tdsRef, (snapshot) => {
      const tdsValue = snapshot.val();
      setTds(tdsValue);
      setLastUpdate(new Date().toLocaleTimeString());
    });

    // Suscribirse a los cambios en la turbidez
    onValue(turbidezRef, (snapshot) => {
      const turbidezValue = snapshot.val();
      setTurbidez(turbidezValue);
      setLastUpdate(new Date().toLocaleTimeString());
    });

    // Suscribirse a cambios en el estado de la bomba
    onValue(pumpStatusRef, (snapshot) => {
      const status = snapshot.val();
      setPumpStatus(status);
    });

    // Suscribirse a cambios en el estado de programación de la bomba
    onValue(pumpScheduleRef, (snapshot) => {
      const schedule = snapshot.val();
      setPumpScheduleActive(schedule);
    });

    // Suscribirse a cambios en el intervalo de la bomba
    onValue(pumpIntervalRef, (snapshot) => {
      const interval = snapshot.val();
      if (interval !== null) {
        setPumpInterval(interval.toString());
      }
    });

    // Limpiar suscripciones al desmontar el componente
    return () => {
      off(phRef);
      off(temperaturaRef);
      off(timeActiveRef);
      off(tdsRef);
      off(turbidezRef);
      off(pumpStatusRef);
      off(pumpScheduleRef);
      off(pumpIntervalRef);
    };
  }, []);

  // Función para mostrar el valor con la unidad correspondiente
  const getDisplayValue = (value: number | null, unit: string) => {
    if (value === null) return "--";
    return `${value.toFixed(1)}${unit}`;
  };

  // Estado y función para el toggle de la bomba
  const useToggleState = (initialState = false): ToggleProps => {
    const [checked, setChecked] = React.useState(initialState);

    React.useEffect(() => {
      // Inicializar el estado del toggle desde Firebase
      const pumpStatusRef = ref(database, "/monitoreo/bomba_estado");
      onValue(pumpStatusRef, (snapshot) => {
        const status = snapshot.val();
        if (status !== null) {
          setChecked(status);
        }
      });

      return () => off(pumpStatusRef);
    }, []);

    const onCheckedChange = (isChecked: boolean): void => {
      setChecked(isChecked);
      // Actualizar Firebase cuando cambia el toggle
      const pumpStatusRef = ref(database, "/monitoreo/bomba_estado");
      set(pumpStatusRef, isChecked);
    };

    return { checked, onChange: onCheckedChange };
  };

  // Estado y función para el toggle de programación
  const useScheduleToggleState = (initialState = false): ToggleProps => {
    const [checked, setChecked] = React.useState(initialState);

    React.useEffect(() => {
      // Inicializar el estado del toggle desde Firebase
      const scheduleRef = ref(database, "/monitoreo/bomba_programada");
      onValue(scheduleRef, (snapshot) => {
        const status = snapshot.val();
        if (status !== null) {
          setChecked(status);
          setPumpScheduleActive(status);
        }
      });

      return () => off(scheduleRef);
    }, []);

    const onCheckedChange = (isChecked: boolean): void => {
      setChecked(isChecked);
      setPumpScheduleActive(isChecked);
      // Actualizar Firebase cuando cambia el toggle
      const scheduleRef = ref(database, "/monitoreo/bomba_programada");
      set(scheduleRef, isChecked);
    };

    return { checked, onChange: onCheckedChange };
  };

  const pumpToggleState = useToggleState();
  const scheduleToggleState = useScheduleToggleState();

  // Función para guardar la programación
  const saveSchedule = () => {
    const intervalMinutes = parseInt(pumpInterval) || 0;

    // Guardar el intervalo en minutos
    const intervalRef = ref(database, "/monitoreo/bomba_intervalo");
    set(intervalRef, intervalMinutes);

    // Establecer el estado activo de la programación
    const scheduleActiveRef = ref(database, "/monitoreo/bomba_programada");
    set(scheduleActiveRef, scheduleToggleState.checked);

    alert("Programación de bomba guardada correctamente");
  };

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#235025" />
        <Text style={styles.loadingText}>
          Cargando información de cultivos...
        </Text>
      </View>
    );
  }

  const content = (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://huerto-en-casa.com/wp-content/uploads/2021/08/lechuga-iceberg-cultivo-1020x680.jpg",
        }}
        style={styles.image}
      />

      <View style={styles.monitoreo}>
        <Text style={styles.titulo}>Bombeo de Agua</Text>
        <View style={styles.data}>
          <View style={styles.row}>
            <Text style={styles.textmoni}>Intervalo de ciclo (min)</Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Min"
                value={pumpInterval}
                onChangeText={(nextValue) => setPumpInterval(nextValue)}
                keyboardType="numeric"
                style={styles.shortInput}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.itemcont}>
              <Text style={styles.textmoni}>Programación Activa</Text>
            </View>
            <Toggle status="success" {...scheduleToggleState} />
          </View>

          <View style={styles.row}>
            <View style={styles.itemcont}>
              <Text style={styles.textmoni}>Encender/Apagar Manualmente</Text>
            </View>
            <Toggle status="success" {...pumpToggleState} />
          </View>

          <View style={styles.row}>
            <Text style={styles.subtitulo}>
              Estado actual: {pumpStatus ? "Encendida" : "Apagada"}
            </Text>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: pumpStatus ? "#4CAF50" : "#F44336",
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  marginLeft: 10,
                },
              ]}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={saveSchedule}>
            <Text style={styles.buttonText}>Guardar Programación</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.monitoreo}>
        <Text style={styles.titulo}>Monitoreo</Text>
        <Text style={styles.titulo}>Última actualización: {lastUpdate}</Text>
        <View style={styles.datos}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text style={styles.dato}>
                {typeof ph === "number" ? ph.toFixed(1) : "--"}
              </Text>
            </View>
            <Text style={styles.circletext}>pH</Text>
          </View>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text style={styles.dato}>
                {tds !== null ? tds.toFixed(1) : "--"}
              </Text>
            </View>
            <Text style={styles.circletext}>TDS</Text>
          </View>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text style={styles.dato}>
                {temperatura !== null ? `${temperatura.toFixed(1)}°C` : "--"}
              </Text>
            </View>
            <Text style={styles.circletext}>Temperatura</Text>
          </View>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text style={styles.dato}>
                {turbidez !== null ? turbidez.toFixed(1) : "--"}
              </Text>
            </View>
            <Text style={styles.circletext}>Turbidez</Text>
          </View>
        </View>
      </View>

      <Text style={styles.help}>¿Necesitas ayuda?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/inteligenciaArtificial")}
      >
        <Text style={styles.buttonText}>Preguntar a la IA</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return <ProtectedRoute>{content}</ProtectedRoute>;
}
