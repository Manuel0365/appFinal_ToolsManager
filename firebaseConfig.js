// Importar las funciones necesarias desde los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Agregar los SDKs adicionales de Firebase que se necesiten
// Enlace a la documentación: https://firebase.google.com/docs/web/setup#available-libraries

// Configuración de Firebase para la aplicación web
// Estas credenciales son generadas en Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDcOSB8fs0s6gRQ00V7hTcogTaqkZxdR3g",
  authDomain: "toolsmanager-c47e0.firebaseapp.com",
  projectId: "toolsmanager-c47e0",
  storageBucket: "toolsmanager-c47e0.firebasestorage.app",
  messagingSenderId: "212648102391",
  appId: "1:212648102391:web:5079eccb7cb21174e606f2"
};

// Inicializar Firebase con la configuración proporcionada
export const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase para su uso en la aplicación
export const FIREBASE_AUTH = getAuth(app); // Servicio de autenticación
export const FIRESTORE_DB = getFirestore(app); // Servicio de Firestore