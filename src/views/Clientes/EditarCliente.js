// src/views/Clientes/EditarCliente.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEditarClienteViewModel } from "../../viewmodels/EditarClienteViewModel";

export default function EditarCliente({ route, navigation }) {
  const {
    nombreCliente,
    setNombreCliente,
    deuda,
    setDeuda,
    fechaCompra,
    setFechaCompra,
    actualizarCliente,
    eliminarCliente,
  } = useEditarClienteViewModel(route, navigation);

  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity onPress={() => navigation.navigate("Clientes")}>
        <Ionicons
          name="arrow-back"
          size={40}
          color="#ccc"
          style={estilos.iconoVolver}
        />
      </TouchableOpacity>

      <Text style={estilos.titulo}>Editar Cliente</Text>

      {/* Campos de Entrada */}
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Nombre del cliente:</Text>
        <TextInput
          style={estilos.entrada}
          value={nombreCliente}
          onChangeText={setNombreCliente}
        />
      </View>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Deuda:</Text>
        <TextInput
          style={estilos.entrada}
          placeholder="$"
          keyboardType="numeric"
          value={deuda}
          onChangeText={setDeuda}
        />
      </View>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Fecha de la compra realizada:</Text>
        <TextInput
          style={estilos.entrada}
          placeholder="DD/MM/AAAA"
          value={fechaCompra}
          onChangeText={setFechaCompra}
        />
      </View>

      {/* Botones de Acción */}
      <View style={estilos.filaBotones}>
        <TouchableOpacity
          style={estilos.botonGuardar}
          onPress={actualizarCliente}
        >
          <Text style={estilos.textoBoton}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botonEliminar}
          onPress={eliminarCliente}
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
  iconoVolver: {
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
