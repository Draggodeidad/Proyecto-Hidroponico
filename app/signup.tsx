import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Cuenta</Text>
      <TextInput style={styles.input} placeholder="Nombre completo" />
      <TextInput style={styles.input} placeholder="Correo electrónico" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />
      <TextInput style={styles.input} placeholder="Confirmar contraseña" secureTextEntry={true} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: 'green',
    fontSize: 16,
  },
});

export default RegisterScreen;
