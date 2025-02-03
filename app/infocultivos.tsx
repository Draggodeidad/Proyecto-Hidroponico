import React from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { Divider, List, ListItem } from "@ui-kitten/components";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface IListItem {
  title: string;
  description: string;
}

const data = new Array(8).fill({
  title: "Item",
  description: "Description for Item",
});

export default function App() {
  const renderItem = ({
    item,
    index,
  }: {
    item: IListItem;
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={() => (
        <View style={styles.itemLista}>
          <Text style={styles.punto}>•</Text>
          <Text>{`${item.title} ${index + 1}`}</Text>
        </View>
      )}
      description={`${item.description} ${index + 1}`}
    />
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <>
            {/** Imagen del cultivo */}
            <Image
              source={{
                uri: "https://huerto-en-casa.com/wp-content/uploads/2021/08/lechuga-iceberg-cultivo-1020x680.jpg",
              }}
              style={styles.image}
            />
            {/** Descripción */}
            <Text style={styles.descrip}>
              Lorsem ipsum dolor sit amet, consectetur adipisci elit, sed
              eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrum exercitationem ullam corporis
              suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur..
            </Text>
            <Divider />
          </>
        }
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        ListFooterComponent={
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Presioname</Text>
          </TouchableOpacity>
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </GestureHandlerRootView>
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
    height: 250,
    resizeMode: "cover",
  },
  descrip: {
    //padding: 1,
    margin: 10,
    fontSize: 16,
    textAlign: "justify",
  },
  lista: {
    flexDirection: "column",
    marginVertical: 5,
    margin: 15,
  },
  itemLista: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  punto: {
    fontSize: 20,
    marginRight: 10,
  },
  listtexto: {
    fontSize: 16,
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
