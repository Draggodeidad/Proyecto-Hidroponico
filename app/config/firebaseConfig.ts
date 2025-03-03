// firebaseConfig.ts
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getFirestore, Firestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD7rr0s5UZPdR8LCmsuZnt8yYXm3a6Uge0",
  authDomain: "hidroponia-eba09.firebaseapp.com",
  databaseURL: "https://hidroponia-eba09-default-rtdb.firebaseio.com",
  projectId: "hidroponia-eba09",
  storageBucket: "hidroponia-eba09.firebasestorage.app",
  messagingSenderId: "186939424876",
  appId: "1:186939424876:web:93f19187187b6606d79849",
  measurementId: "G-5P4M4520Y0",
};

// Inicializar Firebase
let app: FirebaseApp;
let database: Database;
let firestore: Firestore;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    firestore = getFirestore(app);
  } catch (error) {
    console.error("Error initializing Firebase: ", error);
    throw error;
  }
} else {
  app = getApps()[0];
  database = getDatabase(app);
  firestore = getFirestore(app);
}

// Exportar las configuraciones y la instancia de la base de datos
export { database, firestore };
export default app;
