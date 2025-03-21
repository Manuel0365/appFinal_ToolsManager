// src/views/Proveedores/AgregarProveedor.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProveedorViewModel } from "../../viewmodels/ProveedorViewModel";

export default function AgregarProveedor({ navigation }) {
  const {
    nombreProveedor,
    setNombreProveedor,
    productoOfrecido,
    setProductoOfrecido,
    telefono,
    setTelefono,
    agregarProveedor,
  } = useProveedorViewModel(navigation);

  return (
    <View style={estilos.contenedor}>
      {/* Botón para regresar */}
      <TouchableOpacity onPress={() => navigation.navigate("Proveedores")}>
        <Ionicons
          name="arrow-back"
          size={40}
          color="#ccc"
          style={estilos.botonRegresar}
        />
      </TouchableOpacity>

      {/* Título */}
      <Text style={estilos.titulo}>Registro de Proveedor</Text>

      {/* Campos de Entrada */}
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Nombre del proveedor:</Text>
        <TextInput
          style={estilos.entrada}
          value={nombreProveedor}
          onChangeText={setNombreProveedor}
        />
      </View>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Productos que ofrece:</Text>
        <TextInput
          style={[estilos.entrada, estilos.entradaDescripcion]}
          multiline
          value={productoOfrecido}
          onChangeText={setProductoOfrecido}
        />
      </View>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Teléfono:</Text>
        <TextInput
          style={estilos.entrada}
          placeholder="+52"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>

      {/* Botones */}
      <View style={estilos.filaBotones}>
        <TouchableOpacity
          style={estilos.botonAgregar}
          onPress={agregarProveedor}
        >
          <Text style={estilos.textoBoton}>Agregar Proveedor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botonCancelar}
          onPress={() => navigation.navigate("Proveedores")}
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
  botonRegresar: {
    marginTop: 35,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF7F00",
    textAlign: "center",
    marginBottom: 50,
    marginTop: 20,
  },
  grupoEntrada: {
    marginBottom: 20,
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
  filaBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
  },
  botonAgregar: {
    backgroundColor: "#0056D2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  botonCancelar: {
    backgroundColor: "#FF4D4D",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
