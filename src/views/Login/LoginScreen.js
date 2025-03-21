// src/views/Login/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLoginViewModel } from "../../viewmodels/LoginViewModel";

export default function LoginScreen({ navigation }) {
  const {
    correo,
    contrasena,
    contrasenaVisible,
    errorCorreo,
    errorContrasena,
    setCorreo,
    setContrasena,
    setContrasenaVisible,
    manejarInicioSesion,
  } = useLoginViewModel(navigation);

  return (
    <View style={estilos.contenedor}>
      <ImageBackground
        source={require("../../../assets/circles.png")}
        style={estilos.fondoCirculos}
      >
        <View style={estilos.contenedorLogo}>
          <Image
            source={require("../../../assets/toolsmanager_logo_splash.png")}
            style={estilos.logo}
          />
          <Text style={estilos.textoBienvenida}>¡Bienvenido!</Text>
        </View>
      </ImageBackground>

      <View style={estilos.contenedorSesion}>
        <Text style={estilos.tituloSesion}>Iniciar Sesión</Text>

        <View style={estilos.contenedorEntrada}>
          <TextInput
            style={estilos.entrada}
            placeholder="Correo Electrónico"
            placeholderTextColor="#999"
            value={correo}
            onChangeText={setCorreo}
          />
        </View>
        {errorCorreo ? (
          <Text style={estilos.textoError}>{errorCorreo}</Text>
        ) : null}

        <View style={estilos.contenedorEntrada}>
          <TextInput
            style={estilos.entrada}
            placeholder="Contraseña"
            secureTextEntry={!contrasenaVisible}
            placeholderTextColor="#999"
            value={contrasena}
            onChangeText={setContrasena}
          />
          <TouchableOpacity
            style={estilos.icono}
            onPress={() => setContrasenaVisible(!contrasenaVisible)}
          >
            <MaterialIcons
              name={contrasenaVisible ? "visibility" : "visibility-off"}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        {errorContrasena ? (
          <Text style={estilos.textoError}>{errorContrasena}</Text>
        ) : null}

        <TouchableOpacity onPress={() => navigation.navigate("CuentaNueva")}>
          <Text style={estilos.enlace}>Crear Cuenta Nueva</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.boton} onPress={manejarInicioSesion}>
          <Text style={estilos.textoBoton}>Iniciar Sesión</Text>
          <MaterialIcons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    alignItems: "center",
    justifyContent: "center",
  },
  fondoCirculos: {
    width: 385,
    height: 330,
  },
  contenedorLogo: {
    alignItems: "flex-start",
    padding: 35,
  },
  logo: {
    width: 150,
    height: 150,
  },
  textoBienvenida: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginLeft: 25,
  },
  contenedorSesion: {
    padding: 20,
    alignItems: "center",
  },
  tituloSesion: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
    color: "#333",
  },
  contenedorEntrada: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#007bff",
    marginBottom: 20,
    width: "100%",
  },
  entrada: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: "#333",
  },
  icono: {
    padding: 10,
  },
  enlace: {
    color: "#007bff",
    fontSize: 15,
    textAlign: "right",
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  boton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7f00",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    marginTop: 40,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 50,
  },
  textoError: {
    color: "red",
    fontSize: 14,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
});
