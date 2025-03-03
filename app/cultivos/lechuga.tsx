import React, {useState, useEffect} from "react";
import { Text, ScrollView, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Divider, List, ListItem } from "@ui-kitten/components";
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from 'axios';

interface IPunto {
    titulo: string;
    descripcion: string;
}

interface ICultivo {
    _id: string;
    titulo: string;
    descripcion: string;
    puntos: IPunto[];
}

export default function App() {

const [cultivoData, setCultivoData] = useState<ICultivo | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://railway-node-mongo-example-production.up.railway.app/infocultivos/67c4f836be7ed5f9f69dfa15');
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setCultivoData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error obteniendo datos:', error);
        setError('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  if (error || !cultivoData) {
    return <Text style={styles.errorText}>{error || 'No se encontraron datos'}</Text>;
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: IPunto;
    index: number;
  }): React.ReactElement => (
    <ListItem
      title={() => (
        <View style={styles.itemLista}>
          <Text style={styles.punto}>•</Text>
          <Text style={styles.Tpoint}>{item.titulo}</Text>
        </View>
      )}
      description={item.descripcion}
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
                uri: "https://cdn.pixabay.com/photo/2020/05/16/19/30/lettuce-5178889_1280.jpg",
              }}
              style={styles.image}
            />
            {/** Descripción */}
            <Text style={styles.descrip}>{cultivoData.descripcion}</Text>
            <Divider />
          </>
        }
        data={cultivoData.puntos}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyList}>No hay puntos disponibles</Text>}
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
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  emptyList: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#666',
  },
  Tpoint: {
    fontWeight: 'bold',
  }
});