import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import logo from "../assets/logo_app.png";

// Obtener el ancho de la pantalla
const { width } = Dimensions.get("window");

export default function MenuLateral({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false); // Estado para controlar la visibilidad del menú
  const animacionSlide = useRef(new Animated.Value(-width * 0.7)).current; // Animación para deslizar el menú

  // Alternar la visibilidad del menú
  const alternarMenu = () => {
    if (menuVisible) {
      Animated.timing(animacionSlide, {
        toValue: -width * 0.7, // Ocultar menú
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animacionSlide, {
        toValue: 0, // Mostrar menú
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      await signOut(FIREBASE_AUTH); // Cierra la sesión en Firebase
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
      navigation.navigate("Login"); // Redirigir a la pantalla de Login
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cerrar sesión.");
    }
  };

  return (
    <View style={estilos.contenedor}>
      {/* Fondo oscuro cuando el menú está abierto */}
      {menuVisible && (
        <TouchableOpacity
          style={estilos.superposicion}
          activeOpacity={1}
          onPress={alternarMenu} // Cierra el menú al presionar el fondo
        />
      )}

      {/* Contenedor del menú lateral */}
      <Animated.View style={[estilos.barraLateral, { left: animacionSlide }]}>
        {/* Logo en el menú */}
        <Image source={logo} style={estilos.logo} />

        {/* Opciones del menú */}
        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Proveedores");
          }}
        >
          <Text style={estilos.textoMenu}>Proveedores</Text>
          <MaterialIcons name="chevron-right" size={24} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Clientes");
          }}
        >
          <Text style={estilos.textoMenu}>Clientes</Text>
          <MaterialIcons name="chevron-right" size={24} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.opcionMenu}
          onPress={() => {
            alternarMenu();
            navigation.navigate("Inventario");
          }}
        >
          <Text style={estilos.textoMenu}>Inventario</Text>
          <MaterialIcons name="chevron-right" size={24} color="#007bff" />
        </TouchableOpacity>

        {/* Botón para cerrar sesión */}
        <TouchableOpacity
          style={estilos.botonCerrarSesion}
          onPress={() => {
            alternarMenu();
            cerrarSesion();
          }}
        >
          <Text style={estilos.textoCerrarSesion}>Cerrar Sesión</Text>
          <MaterialIcons name="logout" size={30} color="red" />
        </TouchableOpacity>
      </Animated.View>

      {/* Botón para abrir el menú */}
      <TouchableOpacity onPress={alternarMenu} style={estilos.botonMenu}>
        <MaterialIcons name="menu" size={40} color="#333" />
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const estilos = StyleSheet.create({
  contenedor: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  superposicion: {
    position: "absolute",
    top: 0,
    left: 0,
    right: -40,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
    zIndex: 5, // Por encima del contenido principal
  },
  barraLateral: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: "#fff",
    padding: 20,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    zIndex: 10, // Encima de la superposición
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
  opcionMenu: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoMenu: {
    fontSize: 18,
    color: "#007bff",
    fontWeight: "bold",
  },
  botonCerrarSesion: {
    marginTop: "auto",
    padding: 15,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textoCerrarSesion: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
    marginRight: 10,
  },
  botonMenu: {
    marginTop: 40,
    marginLeft: 20,
    zIndex: 20,
  },
});
