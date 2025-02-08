import React from "react";
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Radio, RadioGroup, Divider } from "@ui-kitten/components";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Preferencias() {
  const [selectedTemaIndex, setSelectedTemaIndex] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.title}>Tema</Text>
        <Card style={styles.card}>
          <RadioGroup
            selectedIndex={selectedTemaIndex}
            onChange={index => setSelectedTemaIndex(index)}
          >
            {/* Opción Claro */}
            <TouchableOpacity style={styles.radioOption} onPress={() => setSelectedTemaIndex(0)}>
              <MaterialIcons name="light-mode" size={24} color="black" />
              <Radio style={styles.radio} checked={selectedTemaIndex === 0} onChange={() => setSelectedTemaIndex(0)}>
                Claro
              </Radio>
            </TouchableOpacity>
            <Divider style={styles.divider} />

            {/* Opción Oscuro */}
            <TouchableOpacity style={styles.radioOption} onPress={() => setSelectedTemaIndex(1)}>
              <MaterialIcons name="dark-mode" size={24} color="black" />
              <Radio style={styles.radio} checked={selectedTemaIndex === 1} onChange={() => setSelectedTemaIndex(1)}>
                Oscuro
              </Radio>
            </TouchableOpacity>
            <Divider style={styles.divider} />

            {/* Opción Automático */}
            <TouchableOpacity style={styles.radioOption} onPress={() => setSelectedTemaIndex(2)}>
              <Ionicons name="invert-mode" size={24} color="black" />
              <Radio style={styles.radio} checked={selectedTemaIndex === 2} onChange={() => setSelectedTemaIndex(2)}>
                Automático
              </Radio>
            </TouchableOpacity>
          </RadioGroup>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  option: {
    width: "100%",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    padding: 1,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    color: "#235025",
    fontWeight: "bold",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  radio: {
    marginLeft: 10,
  },
  divider: {
    width: "120%",
    marginVertical: 10,
    marginHorizontal: -25,
    backgroundColor: "#E0E0E0",
  },
});
