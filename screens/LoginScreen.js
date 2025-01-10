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
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";

export default function PantallaInicioSesion({ navigation }) {
  // Estado para controlar la visibilidad de la contraseña
  const [contrasenaVisible, setContrasenaVisible] = useState(false);
  const [correo, setCorreo] = useState(""); // Estado para el correo electrónico
  const [contrasena, setContrasena] = useState(""); // Estado para la contraseña
  const [errorCorreo, setErrorCorreo] = useState(""); // Error en el correo
  const [errorContrasena, setErrorContrasena] = useState(""); // Error en la contraseña

  // Manejo del inicio de sesión
  const manejarInicioSesion = async () => {
    let valido = true;

    // Validar que el correo no esté vacío
    if (!correo.trim()) {
      setErrorCorreo("El correo es obligatorio.");
      valido = false;
    } else {
      setErrorCorreo(""); // Limpiar error si es válido
    }

    // Validar que la contraseña no esté vacía
    if (!contrasena.trim()) {
      setErrorContrasena("La contraseña es obligatoria.");
      valido = false;
    } else {
      setErrorContrasena(""); // Limpiar error si es válido
    }

    if (!valido) return;

    try {
      // Autenticación en Firebase
      const credencialUsuario = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        correo,
        contrasena
      );
      console.log("Usuario autenticado:", credencialUsuario.user);

      // Navegar al Home después del inicio de sesión
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);

      // Mostrar mensajes de error específicos
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

  return (
    <View style={estilos.contenedor}>
      {/* Imagen de fondo con el logo */}
      <ImageBackground
        source={require("../assets/circles.png")}
        style={estilos.fondoCirculos}
      >
        <View style={estilos.contenedorLogo}>
          <Image
            source={require("../assets/toolsmanager_logo_splash.png")}
            style={estilos.logo}
          />
          <Text style={estilos.textoBienvenida}>¡Bienvenido!</Text>
        </View>
      </ImageBackground>

      <View style={estilos.contenedorSesion}>
        <Text style={estilos.tituloSesion}>Iniciar Sesión</Text>

        {/* Campo de entrada para el correo */}
        <View style={estilos.contenedorEntrada}>
          <TextInput
            style={estilos.entrada}
            placeholder="Correo Electrónico"
            placeholderTextColor="#999"
            value={correo}
            onChangeText={setCorreo}
          />
        </View>
        {errorCorreo ? <Text style={estilos.textoError}>{errorCorreo}</Text> : null}

        {/* Campo de entrada para la contraseña */}
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

        {/* Enlace para crear una nueva cuenta */}
        <TouchableOpacity onPress={() => navigation.navigate("CuentaNueva")}>
          <Text style={estilos.enlace}>Crear Cuenta Nueva</Text>
        </TouchableOpacity>

        {/* Botón para iniciar sesión */}
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
