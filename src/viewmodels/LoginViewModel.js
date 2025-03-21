import { useState } from "react";
import { Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export const useLoginViewModel = (navigation) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contrasenaVisible, setContrasenaVisible] = useState(false);
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");

  const manejarInicioSesion = async () => {
    let valido = true;

    if (!correo.trim()) {
      setErrorCorreo("El correo es obligatorio.");
      valido = false;
    } else {
      setErrorCorreo("");
    }

    if (!contrasena.trim()) {
      setErrorContrasena("La contraseña es obligatoria.");
      valido = false;
    } else {
      setErrorContrasena("");
    }

    if (!valido) return;

    try {
      const credencialUsuario = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        correo,
        contrasena
      );
      console.log("Usuario autenticado:", credencialUsuario.user);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);

      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "No se encontró una cuenta con este correo.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "La contraseña es incorrecta.");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "El correo ingresado no es válido.");
      } else {
        Alert.alert("Error al iniciar sesión", error.message);
      }
    }
  };

  return {
    correo,
    contrasena,
    contrasenaVisible,
    errorCorreo,
    errorContrasena,
    setCorreo,
    setContrasena,
    setContrasenaVisible,
    manejarInicioSesion,
  };
};
