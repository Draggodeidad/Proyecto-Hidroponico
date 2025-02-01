import { Text, ScrollView, StyleSheet,Image, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
    {/**Imagen del cultivo */}
      <Image source={{uri: 'https://huerto-en-casa.com/wp-content/uploads/2021/08/lechuga-iceberg-cultivo-1020x680.jpg'}}
      style={styles.image}/>
      {/**Descripcion */}
        <Text style={styles.descrip}>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur..</Text>
      {/**Aqui va el divider */}

      {/**Lista de variables */}
      {/* Generación dinámica de la lista */}
      <View style={styles.lista}>
          <View style={styles.itemLista}>
            <Text style={styles.punto}>•</Text>
            {/**Descripcion de variable */}
            <Text style={styles.listtexto}>saas</Text>
          </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Presioname</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  descrip: {
    //padding: 1,
    margin: 10,
    fontSize: 16,
    textAlign: 'justify',
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
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
