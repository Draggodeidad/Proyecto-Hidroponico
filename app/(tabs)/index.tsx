import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Toggle, ToggleProps, Input } from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { database } from "../config/firebaseConfig";

export default function Monitoreo() {
  const [ph, setPh] = useState<number | null>(null);
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [humedad, setHumedad] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [timeActive, setTimeActive] = useState<number | null>(null);

  useEffect(() => {
    // Crear referencias usando la instancia de database importada
    const phRef = ref(database, "/monitoreo/ph");
    const temperaturaRef = ref(database, "/monitoreo/temperatura");
    const humedadRef = ref(database, "/monitoreo/humedad");
    const timeActiveRef = ref(database, "/monitoreo/ultima_actualizacion");

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

    // Suscribirse a cambios en la humedad
    onValue(humedadRef, (snapshot) => {
      const humValue = snapshot.val();
      setHumedad(humValue);
      setLastUpdate(new Date().toLocaleTimeString());
    });

    // Limpiar suscripciones al desmontar el componente
    return () => {
      off(phRef);
      off(temperaturaRef);
      off(humedadRef);
      off(timeActiveRef);
    };
  }, []);

  // Función para mostrar el valor con la unidad correspondiente
  const getDisplayValue = (value: number | null, unit: string) => {
    if (value === null) return "--";
    return `${value.toFixed(1)}${unit}`;
  };

  // Lógica para el tiempo y el switch
  const [time1, setTime1] = useState(new Date());
  const [show1, setShow1] = useState(false);

  const [time2, setTime2] = useState(new Date());
  const [show2, setShow2] = useState(false);

  const onChange1 = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || time1;
    setShow1(Platform.OS === "ios");
    setTime1(currentDate);
  };

  const onChange2 = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || time2;
    setShow2(Platform.OS === "ios");
    setTime2(currentDate);
  };

  const showTimepicker1 = () => {
    setShow1(true);
  };

  const showTimepicker2 = () => {
    setShow2(true);
  };

  const [value, setValue] = React.useState("");

  const useToggleState = (initialState = false): ToggleProps => {
    const [checked, setChecked] = React.useState(initialState);
    const onCheckedChange = (isChecked: boolean): void => {
      setChecked(isChecked);
    };
    return { checked, onChange: onCheckedChange };
  };
  const successToggleState = useToggleState();

  return (
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
            <Text style={styles.textmoni}>Horario</Text>
            <View style={styles.timePickerContainer}>
              <Button
                onPress={showTimepicker1}
                title={time1.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                color="green"
              />
              {show1 && (
                <DateTimePicker
                  testID="dateTimePicker1"
                  value={time1}
                  mode="time"
                  is24Hour={false}
                  display="spinner"
                  onChange={onChange1}
                  style={styles.picker}
                  textColor="#fff"
                />
              )}
            </View>
            <Text style={styles.textmoni}>a</Text>
            <Button
              onPress={showTimepicker2}
              title={time2.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              color="green"
            />
            {show2 && (
              <DateTimePicker
                testID="dateTimePicker2"
                value={time2}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={onChange2}
                style={styles.picker}
                textColor="#fff"
              />
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.textmoni}>Cada cuanto</Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Min"
                value={value}
                onChangeText={(nextValue) => setValue(nextValue)}
                keyboardType="numeric"
                style={styles.shortInput}
              />
              <Text style={styles.textmoni}>Min</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.itemcont}>
              <Text style={styles.textmoni}>Activar</Text>
            </View>
            <Toggle status="success" {...successToggleState} />
          </View>
        </View>
      </View>

      <View style={styles.monitoreo}>
        <Text style={styles.titulo}>Monitoreo</Text>
        <Text style={styles.titulo}>Tiempo Activo: {timeActive} </Text>
        <View style={styles.datos}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text style={styles.dato}>
              {typeof ph === 'number' ? ph.toFixed(1) : "--"}
              </Text>
            </View>
            <Text style={styles.circletext}>pH</Text>
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
                {humedad !== null ? `${humedad.toFixed(1)}%` : "--"}
              </Text>
            </View>
            <Text style={styles.circletext}>Humedad</Text>
          </View>
        </View>
      </View>

      <Text style={styles.help}>Necesitas ayuda?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/inteligenciaArtificial")}
      >
        <Text style={styles.buttonText}>Preguntar a la IA</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 25,
  },
  monitoreo: {
    backgroundColor: "#004d00",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  titulo: {
    color: "#fafafa",
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "semibold",
    //opacity: 0.5,
  },
  data: {
    width: "100%",
  },
  itemcont: {},
  textmoni: {
    color: "#fafafa",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  shortInput: {
    width: 68,
    height: 40,
    marginRight: 5,
  },
  timePickerContainer: {
    flexDirection: "row",
    marginLeft: 90,
    alignItems: "center",
  },
  picker: {
    width: 100,
    backgroundColor: "transparent",
  },
  datos: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  circleContainer: {
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#000",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  dato: {
    color: "#fafafa",
    fontSize: 14,
    textAlign: "center",
  },
  circletext: {
    color: "#fafafa",
    fontSize: 16,
    marginTop: 10,
  },
  help: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#235025",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});
