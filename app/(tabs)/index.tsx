import { Text, StyleSheet, Image, View, ScrollView, TouchableOpacity } from 'react-native';
import { router, useRouter } from "expo-router";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {/**Imagen del top y el titulo de la pestaña */}
      <View style={styles.topSection}>
        <Image 
          source={{uri: 'https://th.bing.com/th/id/OIP.CaTRl1Alana3ISLYythVUAHaE8?rs=1&pid=ImgDetMain'}} 
          style={styles.topImage}
        />
        <Text style={styles.topText}>Los Diferentes tipos de cultivos</Text>
      </View>
      {/**Seccion de cultivos */}
      <View style={styles.bottomSection}>

        <View style={styles.cultivo}>
        <TouchableOpacity 
        onPress={() => router.push('/infocultivo')}
        style={{width: '100%'}}>
          <Image 
            source={{
            uri: 'https://th.bing.com/th/id/OIP.CaTRl1Alana3ISLYythVUAHaE8?rs=1&pid=ImgDetMain'}}
            style={styles.imgCultivo}
          />
          <Text style={styles.title}>Lechuga 1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cultivo}>
        <TouchableOpacity 
        onPress={() => router.push('/infocultivo')}
        style={{width: '100%'}}>
          <Image 
            source={{
            uri: 'https://th.bing.com/th/id/OIP.CaTRl1Alana3ISLYythVUAHaE8?rs=1&pid=ImgDetMain'}}
            style={styles.imgCultivo}
          />
          <Text style={styles.title}>Lechuga 1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cultivo}>
        <TouchableOpacity 
        onPress={() => router.push('/infocultivo')}
        style={{width: '100%'}}>
          <Image 
            source={{
            uri: 'https://th.bing.com/th/id/OIP.CaTRl1Alana3ISLYythVUAHaE8?rs=1&pid=ImgDetMain'}}
            style={styles.imgCultivo}
          />
          <Text style={styles.title}>Lechuga 1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cultivo}>
        <TouchableOpacity 
        onPress={() => router.push('/infocultivo')}
        style={{width: '100%'}}>
          <Image 
            source={{
            uri: 'https://th.bing.com/th/id/OIP.CaTRl1Alana3ISLYythVUAHaE8?rs=1&pid=ImgDetMain'}}
            style={styles.imgCultivo}
          />
          <Text style={styles.title}>Lechuga 1</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  topImage: {
    width: '100%',
    height: 200,
    opacity: 0.9,
    objectFit: 'cover'
  },
  topText: {
    marginTop: 10,
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 14,
  },
  cultivo: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  imgCultivo: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    paddingBottom:5,
    color: '#000',
    fontWeight: 'bold',
  },
});
