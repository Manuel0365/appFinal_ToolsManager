// src/views/Productos/EditarProducto.js
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
import { useEditarProductoViewModel } from "../../viewmodels/EditarProductoViewModel";

export default function EditarProducto({ route, navigation }) {
  const {
    nombreProducto,
    setNombreProducto,
    categoria,
    setCategoria,
    descripcion,
    setDescripcion,
    unidadesDisponibles,
    setUnidadesDisponibles,
    precioVenta,
    setPrecioVenta,
    actualizarProducto,
    eliminarProducto,
  } = useEditarProductoViewModel(route, navigation);

  return (
    <View style={estilos.contenedor}>
      {/* Botón para regresar */}
      <TouchableOpacity onPress={() => navigation.navigate("Inventario")}>
        <Ionicons
          name="arrow-back"
          size={40}
          color="#ccc"
          style={estilos.flechaAtras}
        />
      </TouchableOpacity>

      <Text style={estilos.titulo}>Editar Producto</Text>

      {/* Campos de entrada */}
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
            placeholder="$"
            keyboardType="numeric"
            value={precioVenta}
            onChangeText={setPrecioVenta}
          />
        </View>
      </View>

      {/* Botones de acción */}
      <View style={estilos.filaBotones}>
        <TouchableOpacity
          style={estilos.botonGuardar}
          onPress={actualizarProducto}
        >
          <Text style={estilos.textoBoton}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botonEliminar}
          onPress={eliminarProducto}
        >
          <Text style={estilos.textoBoton}>Eliminar</Text>
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
  botonGuardar: {
    backgroundColor: "#0056D2",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  botonEliminar: {
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
