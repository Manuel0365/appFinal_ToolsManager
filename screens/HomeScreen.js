import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MenuLateral from "../screens/BarraLateral";

// Obtener las dimensiones de la pantalla
const { width } = Dimensions.get("window");

// Pantalla principal (Home)
export default function PantallaInicio({ navigation }) {
  return (
    <View style={estilos.contenedor}>
      {/* Menú lateral */}
      <MenuLateral navigation={navigation} />

      {/* Encabezado con mensaje motivacional */}
      <View style={estilos.encabezado}>
        <Text style={estilos.textoEncabezado}>
          Cada herramienta que vendes es un paso más hacia la construcción de tus sueños.
          ¡Sigue adelante!
        </Text>
      </View>

      {/* Tarjeta que muestra las ganancias brutas */}
      <View style={estilos.tarjeta}>
        <Text style={estilos.tituloTarjeta}>Ganancia Bruto</Text>
        <Text style={estilos.cantidadTarjeta}>$0.00</Text>
        {/* Aquí podrías agregar un gráfico con una biblioteca como react-native-chart-kit */}
      </View>

      {/* Barra de navegación inferior */}
      <View style={estilos.barraNavegacion}>
        <TouchableOpacity
          style={estilos.botonNavegacion}
          onPress={() => navigation.navigate("Home")}
        >
          <MaterialIcons name="home" size={30} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botonNavegacion}
          onPress={() => navigation.navigate("Notification")}
        >
          <MaterialIcons name="notifications" size={30} color="#aaa" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos
const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
  },
  encabezado: {
    backgroundColor: "#FF7F00",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  textoEncabezado: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 90,
    padding: 20,
  },
  tarjeta: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tituloTarjeta: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  cantidadTarjeta: {
    fontSize: 24,
    color: "#FF7F00",
    fontWeight: "bold",
  },
  tarjetaSemana: {
    backgroundColor: "#000",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoSemana: {
    color: "#fff",
    fontSize: 16,
  },
  flecha: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  barraNavegacion: {
    position: "absolute",
    bottom: 10,
    width: width,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  botonNavegacion: {
    alignItems: "center",
    justifyContent: "center",
  },
});
