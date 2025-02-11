import { DefaultTheme } from "@react-navigation/native";
import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Text, Card, Divider, Button } from "@ui-kitten/components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

export default function AyudaScreen() {
  const handleEmail = () => {
    const url = "https://mail.google.com/mail/u/1/#inbox?compose=new";
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const handleWhats = () => {
    const url =
      "https://api.whatsapp.com/send/?phone=522221778994&text&type=phone_number&app_absent=0";
    Linking.openURL(url).catch((err) => console.error(err));
  };

  const handleFacebook = () => {
    const url = "https://www.facebook.com/";
    Linking.openURL(url).catch((err) => console.error(err));
  };

  const handleInstagram = () => {
    const url = "https://www.instagram.com/";
    Linking.openURL(url).catch((err) => console.error(err));
  };

  const handeleX = () => {
    const url = "https://www.x.com/";
    Linking.openURL(url).catch((err) => console.error(err));
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {/* Header */}
        {/* se comentarizo este header porque se va a utilizar el componente de _layout.tsx */}
        {/* <View style={styles.headerContainer}>
          <Text style={{}} category="h1">
            Ayuda
          </Text>
        </View> */}

        {/* Soporte Técnico Card */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle} category="h6">
            Contacto con soporte técnico
          </Text>
          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.contactOption}
              onPress={handleEmail}
            >
              <MaterialIcons name="email" size={24} color="#235025" />
              <Text style={styles.contactText} category="s1">
                CodeWorld@gmail.com
              </Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity
              style={styles.contactOption}
              onPress={handleWhats}
            >
              <FontAwesome name="whatsapp" size={24} color="#235025" />
              <Text style={styles.contactText} category="s1">
                238-223-1234
              </Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.contactOption}>
              <Entypo name="phone" size={24} color="#235025" />
              <Text style={styles.contactText} category="s1">
                238-223-1234
              </Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Redes Sociales Card */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle} category="h6">
            Enlaces a Redes Sociales
          </Text>
          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.contactOption}
              onPress={handleFacebook}
            >
              <FontAwesome name="facebook" size={24} color="#235025" />
              <Text style={styles.contactText} category="s1">
                CodeWorld
              </Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity
              style={styles.contactOption}
              onPress={handleInstagram}
            >
              <FontAwesome name="instagram" size={24} color="#235025" />
              <Text style={styles.contactText} category="s1">
                @codeworld
              </Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <TouchableOpacity style={styles.contactOption} onPress={handeleX}>
              <FontAwesome name="twitter" size={24} color="#235025" />
              <Text style={styles.contactText} category="s1">
                @CodeWorld
              </Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Botón Reportar Problema */}
        <View style={styles.reportContainer}>
          <Button
            style={styles.reportButton}
            status="danger"
            accessoryLeft={(props) => (
              <MaterialIcons name="report-problem" size={24} color="white" />
            )}
          >
            Reportar un Problema
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  // No se esta usando
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    alignItems: "center",
  },
  // No se esta usando
  headerText: {
    color: "#235025",
    fontWeight: "bold",
  },
  sectionContainer: {
    marginTop: 30,
    padding: 16,
  },
  sectionTitle: {
    color: "#235025",
    marginBottom: 12,
    fontWeight: "600",
  },
  card: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  contactOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  contactText: {
    marginLeft: 16,
    color: "#235025",
  },
  divider: {
    backgroundColor: "#e0e0e0",
  },
  reportContainer: {
    marginTop: 50,
    position: "fixed",
    padding: 16,
    marginBottom: 20,
  },
  reportButton: {
    borderRadius: 8,
    height: 48,
  },
});
