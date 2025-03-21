// src/views/Proveedores/EditarProveedor.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEditarProveedorViewModel } from "../../viewmodels/EditarProveedorViewModel";

export default function EditarProveedor({ route, navigation }) {
  const {
    nombreProveedor,
    setNombreProveedor,
    productoOfrecido,
    setProductoOfrecido,
    telefono,
    setTelefono,
    actualizarProveedor,
    eliminarProveedor,
  } = useEditarProveedorViewModel(route, navigation);

  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={40}
          color="#ccc"
          style={estilos.botonRegresar}
        />
      </TouchableOpacity>

      <Text style={estilos.titulo}>Editar Proveedor</Text>

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
          style={estilos.entrada}
          value={productoOfrecido}
          onChangeText={setProductoOfrecido}
        />
      </View>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Teléfono:</Text>
        <TextInput
          style={estilos.entrada}
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>

      {/* Botones de Acción */}
      <View style={estilos.filaBotones}>
        <TouchableOpacity
          style={estilos.botonGuardar}
          onPress={actualizarProveedor}
        >
          <Text style={estilos.textoBoton}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botonEliminar}
          onPress={eliminarProveedor}
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
  botonRegresar: {
    marginTop: 30,
    marginBottom: 30,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF7F00",
    textAlign: "center",
    marginBottom: 60,
  },
  grupoEntrada: {
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: "bold",
  },
  entrada: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
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
    fontSize: 16,
  },
});
