import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

const PrivacyPolicyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Política de Privacidad</Text>
      <ScrollView style={styles.content}>
        <Text style={styles.paragraph}>
          Tu privacidad es importante para nosotros. En esta política de privacidad, explicamos cómo recopilamos, usamos y compartimos información sobre ti cuando usas nuestra aplicación.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subTitle}>Recopilación de Información</Text>
          {'\n'}Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, actualizas tu perfil o te comunicas con nosotros.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subTitle}>Uso de la Información</Text>
          {'\n'}Usamos la información que recopilamos para proporcionar, mantener y mejorar nuestros servicios, así como para comunicarnos contigo.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.subTitle}>Compartir la Información</Text>
          {'\n'}No compartimos tu información personal con terceros, excepto en las circunstancias descritas en esta política de privacidad.
        </Text>
        <Text style={styles.paragraph}>
          Si tienes alguna pregunta sobre esta política de privacidad, no dudes en ponerte en contacto con nosotros.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 24,
    color: '#333',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PrivacyPolicyScreen;
