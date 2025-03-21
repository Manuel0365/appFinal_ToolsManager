import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

export default function CrearCuentaPantalla({ navigation }) {
  const [contraseñaVisible, setContraseñaVisible] = useState(false); // Estado para controlar visibilidad de contraseña
  const [correo, setCorreo] = useState(""); // Estado para el correo electrónico
  const [contraseña, setContraseña] = useState(""); // Estado para la contraseña

  const manejarRegistro = async () => {
    // Validar que los campos no estén vacíos
    if (!correo.trim() || !contraseña.trim()) {
      Alert.alert("Error", "Por favor llena todos los campos");
      console.log("Campos vacíos detectados.");
      return;
    }

    // Validar formato del correo electrónico
    const validarCorreo = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    if (!validarCorreo(correo)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido");
      console.log("Correo electrónico inválido.");
      return;
    }

    try {
      console.log("Creando usuario en Firebase Authentication...");
      const credencialUsuario = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        correo,
        contraseña
      );
      const usuario = credencialUsuario.user;

      Alert.alert("Éxito", "Usuario creado correctamente");
      navigation.navigate("Login"); // Navegar a la pantalla de Login
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

  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      <Text style={estilos.titulo}>Crear una Cuenta</Text>

      {/* Campo de correo */}
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Correo Electrónico:</Text>
        <TextInput
          style={estilos.entrada}
          placeholder="Ejemplo: correo@ejemplo.com"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
        />
      </View>

      {/* Campo de contraseña */}
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Contraseña:</Text>
        <View style={estilos.contenedorEntrada}>
          <TextInput
            style={estilos.entrada}
            secureTextEntry={!contraseñaVisible}
            value={contraseña}
            onChangeText={setContraseña}
          />
          <TouchableOpacity
            style={estilos.icono}
            onPress={() => setContraseñaVisible(!contraseñaVisible)}
          >
            <MaterialIcons
              name={contraseñaVisible ? "visibility" : "visibility-off"}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón para registrar */}
      <TouchableOpacity
        style={estilos.botonRegistrar}
        onPress={manejarRegistro}
      >
        <Text style={estilos.textoBoton}>Registrar Cuenta</Text>
      </TouchableOpacity>

      {/* Enlace para iniciar sesión */}
      <TouchableOpacity
        style={estilos.botonLogin}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={estilos.textoLogin}>
          ¿Ya tienes una cuenta?{" "}
          <Text style={estilos.enlaceLogin}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7F00",
    textAlign: "center",
    marginBottom: 30,
  },
  grupoEntrada: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    fontWeight: "bold",
  },
  contenedorEntrada: {
    position: "relative",
    width: "100%",
  },
  entrada: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    paddingRight: 40,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  icono: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  botonRegistrar: {
    backgroundColor: "#0056D2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonLogin: {
    marginTop: 20,
    alignItems: "center",
  },
  textoLogin: {
    fontSize: 14,
    color: "#333",
  },
  enlaceLogin: {
    color: "#0056D2",
    fontWeight: "bold",
  },
});
