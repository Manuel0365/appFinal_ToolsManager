// src/views/Productos/AgregarProducto.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProductoViewModel } from "../../viewmodels/ProductoViewModel";

export default function AgregarProducto({ navigation }) {
  const {
    nombreProducto,
    categoria,
    descripcion,
    unidadesDisponibles,
    precioVenta,
    setNombreProducto,
    setCategoria,
    setDescripcion,
    setUnidadesDisponibles,
    setPrecioVenta,
    agregarProducto,
  } = useProductoViewModel(navigation);

  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity onPress={() => navigation.navigate("Inventario")}>
        <Ionicons
          name="arrow-back"
          size={40}
          color="#ccc"
          style={estilos.flechaAtras}
        />
      </TouchableOpacity>

      <Text style={estilos.titulo}>Registro de Producto</Text>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Nombre del producto:</Text>
        <TextInput
          style={estilos.entrada}
          value={nombreProducto}
          onChangeText={setNombreProducto}
        />
      </View>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Categoría:</Text>
        <TextInput
          style={estilos.entrada}
          value={categoria}
          onChangeText={setCategoria}
        />
      </View>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Descripción:</Text>
        <TextInput
          style={[estilos.entrada, estilos.entradaDescripcion]}
          multiline
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>

      <View style={estilos.fila}>
        <View style={estilos.grupoMitad}>
          <Text style={estilos.etiqueta}>Unidades Disponibles:</Text>
          <TextInput
            style={estilos.entrada}
            keyboardType="numeric"
            value={unidadesDisponibles}
            onChangeText={setUnidadesDisponibles}
          />
        </View>
        <View style={estilos.grupoMitad}>
          <Text style={estilos.etiqueta}>Precio de Venta:</Text>
          <TextInput
            style={estilos.entrada}
            keyboardType="numeric"
            value={precioVenta}
            onChangeText={setPrecioVenta}
          />
        </View>
      </View>

      <View style={estilos.filaBotones}>
        <TouchableOpacity
          style={estilos.botonAgregar}
          onPress={agregarProducto}
        >
          <Text style={estilos.textoBoton}>Agregar Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botonCancelar}
          onPress={() => navigation.navigate("Inventario")}
        >
          <Text style={estilos.textoBoton}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  flechaAtras: {
    marginTop: 30,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF7F00",
    textAlign: "center",
    marginVertical: 20,
    marginBottom: 60,
  },
  grupoEntrada: {
    marginBottom: 20,
  },
  grupoMitad: {
    width: "48%",
  },
  etiqueta: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    fontWeight: "bold",
  },
  entrada: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  entradaDescripcion: {
    height: 60,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filaBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
  },
  botonAgregar: {
    backgroundColor: "#0056D2",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  botonCancelar: {
    backgroundColor: "#FF4D4D",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
