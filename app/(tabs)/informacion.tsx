import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, Link } from "expo-router";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {/**Imagen del top y el titulo de la pestaña */}
      <View style={styles.topSection}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2019/06/06/08/00/hydroponics-4255403_1280.jpg",
          }}
          style={styles.topImage}
        />
        <Text style={styles.topText}>Los Diferentes tipos de cultivos</Text>
      </View>
      {/**Seccion de cultivos */}
      <View style={styles.bottomSection}>
        <View style={styles.cultivo}>
          <TouchableOpacity
            onPress={() => router.push("/cultivos/lechuga")}
            style={{ width: "100%" }}
          >
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/09/14/19/53/nature-940032_1280.jpg",
              }}
              style={styles.imgCultivo}
            />
            <Text style={styles.title}>Lechuga</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cultivo}>
          <TouchableOpacity
            onPress={() => router.push("/cultivos/fresas")}
            style={{ width: "100%" }}
          >
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2019/07/11/07/29/strawberries-4330211_1280.jpg",
              }}
              style={styles.imgCultivo}
            />
            <Text style={styles.title}>Fresas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cultivo}>
          <TouchableOpacity
            onPress={() => router.push("/cultivos/tomate")}
            style={{ width: "100%" }}
          >
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2019/07/11/10/14/cherry-tomato-4330441_1280.jpg",
              }}
              style={styles.imgCultivo}
            />
            <Text style={styles.title}>Tomate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cultivo}>
          <TouchableOpacity
            onPress={() => router.push("/cultivos/albahaca")}
            style={{ width: "100%" }}
          >
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/09/02/05/04/basil-917999_1280.jpg",
              }}
              style={styles.imgCultivo}
            />
            <Text style={styles.title}>Albahaca</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cultivo}>
          <TouchableOpacity
            onPress={() => router.push("/cultivos/papas")}
            style={{ width: "100%" }}
          >
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2018/05/29/23/18/potato-3440360_1280.jpg",
              }}
              style={styles.imgCultivo}
            />
            <Text style={styles.title}>Papas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cultivo}>
          <TouchableOpacity
            onPress={() => router.push("/cultivos/pimientos")}
            style={{ width: "100%" }}
          >
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2017/09/25/20/44/peppers-2786684_1280.jpg",
              }}
              style={styles.imgCultivo}
            />
            <Text style={styles.title}>Pimientos</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  topImage: {
    width: "100%",
    height: 200,
    opacity: 0.9,
    objectFit: "cover",
  },
  topText: {
    marginTop: 10,
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 14,
  },
  cultivo: {
    width: "48%",
    alignItems: "center",
    marginBottom: 10,
  },
  imgCultivo: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    paddingBottom: 5,
    color: "#000",
    fontWeight: "bold",
  },
});
