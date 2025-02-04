// DataBase/firebaseConfig.tsx
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/database"; // Importa el módulo de Realtime Database

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7rr0s5UZPdR8LCmsuZnt8yYXm3a6Uge0",
  authDomain: "hidroponia-eba09.firebaseapp.com",
  databaseURL: "https://hidroponia-eba09-default-rtdb.firebaseio.com", // URL de tu Realtime Database
  projectId: "hidroponia-eba09",
  storageBucket: "hidroponia-eba09.firebasestorage.app",
  messagingSenderId: "186939424876",
  appId: "1:186939424876:web:93f19187187b6606d79849",
  measurementId: "G-5P4M4520Y0",
};

// Inicializar Firebase solo si no se ha inicializado previamente
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Exportar la referencia a la base de datos
export const database = firebase.database();
