import { Text, ScrollView, StyleSheet, Image, View, Switch, TouchableOpacity } from 'react-native';
import { router, useRouter } from "expo-router";

export default function monitoreo() {
  return (
    <ScrollView style={styles.container}>
    <Image source={{uri: 'https://huerto-en-casa.com/wp-content/uploads/2021/08/lechuga-iceberg-cultivo-1020x680.jpg'}}
    style={styles.image} />

      <View style={styles.monitoreo}>
<Text style={styles.titulo}>Bombeo de Agua</Text>
  <View style={styles.data}>
    <View style={styles.itemcont}>
      <Text style={styles.textmoni}>Horario</Text>
      <View style={styles.timePickerContainer}>
        {/* <TimePicker /> */}
      </View>
    </View>
    <View style={styles.itemcont}>
      <Text style={styles.textmoni}>Cada cuanto</Text>
      <View style={styles.timePickerContainer}>
        {/* <TimePicker /> */}
      </View>
    </View>
    <View style={styles.itemcont}>
      <Text style={styles.textmoni}>Activar</Text>
      <Switch />
    </View>
  </View>
      </View>

    <View style={styles.monitoreo}>
      <Text style={styles.titulo}>Monitoreo</Text>
      <View style={styles.datos}>
        <View style={styles.circleContainer}>
      <View style={styles.circle}>
      <Text style={styles.dato}>48{/**Aqui va el dato obtenido de firebase */}</Text>
      </View>
      <Text style={styles.circletext}>pH</Text>
    </View>
        <View style={styles.circleContainer}>
      <View style={styles.circle}>
        <Text style={styles.dato}>48{/**Aqui va el dato obtenido de firebase */}</Text>
      </View>
      <Text style={styles.circletext}>pH</Text>
    </View>
        <View style={styles.circleContainer}>
      <View style={styles.circle}>
        <Text style={styles.dato}>48{/**Aqui va el dato obtenido de firebase */}</Text>
      </View>
      <Text style={styles.circletext}>pH</Text>
    </View>
        <View style={styles.circleContainer}>
      <View style={styles.circle}>
        <Text style={styles.dato}>48{/**Aqui va el dato obtenido de firebase */}</Text>
      </View>
      <Text style={styles.circletext}>pH</Text>
    </View>
      </View>
    </View>
    <Text style={styles.help}>Necesitas ayuda?</Text>
    <TouchableOpacity 
    style={styles.button}
    onPress={() => router.push("/inteligenciaArtificial")}>
        <Text style={styles.buttonText}>Preguntar a la IA</Text>
    </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 25,
  },
  monitoreo: {
    backgroundColor: '#004d00',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  titulo: {
    color: '#99ff99',
    fontSize: 18,
    marginBottom: 20,
    opacity: 0.5,
  },
  data: {
    width: '100%',
  },
  itemcont: {
    marginBottom: 10,
  },
  textmoni: {
    color: '#fafafa',
    fontSize: 16,
    marginBottom: 10,
  },
  timePickerContainer: {
    marginBottom: 15,
  },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  circleContainer: {
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#000',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dato: {
    color: '#fafafa',
    fontSize: 14,
    textAlign: 'center'
  },
  circletext: {
    color: '#fafafa',
    fontSize: 16,
    marginTop: 10,
  },
  help: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 5,
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