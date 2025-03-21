// src/viewmodels/CrearCuentaViewModel.js
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { Alert } from "react-native";

export function useCrearCuentaViewModel(navigation) {
  const [contraseñaVisible, setContraseñaVisible] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const validarCorreo = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const manejarRegistro = async () => {
    // Validar que los campos no estén vacíos
    if (!correo.trim() || !contraseña.trim()) {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    // Validar formato de correo
    if (!validarCorreo(correo)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido");
      return;
    }

    try {
      const credencialUsuario = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        correo,
        contraseña
      );
      const usuario = credencialUsuario.user;
      Alert.alert("Éxito", "Usuario creado correctamente");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error durante el registro:", error);

      // Manejar errores específicos de Firebase
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "Este correo electrónico ya está en uso");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Error", "La contraseña es demasiado débil");
      } else {
        Alert.alert("Error al registrar", error.message);
      }
    }
  };

  return {
    contraseñaVisible,
    setContraseñaVisible,
    correo,
    setCorreo,
    contraseña,
    setContraseña,
    manejarRegistro,
  };
}
