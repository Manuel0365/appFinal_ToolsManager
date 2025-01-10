import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default function RegistroCliente({ navigation }) {
  const [nombreCliente, setNombreCliente] = useState(""); // Estado para el nombre del cliente
  const [deuda, setDeuda] = useState(""); // Estado para la deuda del cliente
  const [fechaCompra, setFechaCompra] = useState(""); // Estado para la fecha de compra

  const agregarCliente = async () => {
    // Validar campos vacíos
    if (!nombreCliente.trim() || !deuda.trim() || !fechaCompra.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    // Validar formato de fecha
    const formatoFecha = /^\d{2}\/\d{2}\/\d{4}$/; // Formato DD/MM/AAAA
    if (!formatoFecha.test(fechaCompra)) {
      Alert.alert("Error", "La fecha debe estar en formato DD/MM/AAAA");
      return;
    }

    try {
      // Agregar cliente a Firestore
      await addDoc(collection(FIRESTORE_DB, "clientes"), {
        nombreCliente,
        deuda,
        fechaCompra,
      });

      Alert.alert("Éxito", "Cliente agregado correctamente");
      navigation.navigate("Clientes"); // Redirigir a la pantalla de clientes
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      Alert.alert("Error", "No se pudo agregar el cliente");
    }
  };

  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity onPress={() => navigation.navigate("Clientes")}>
        <Ionicons name="arrow-back" size={40} color="#ccc" style={estilos.volverIcono} />
      </TouchableOpacity>

      {/* Título */}
      <Text style={estilos.titulo}>Registro de Cliente</Text>

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

      {/* Botones */}
      <View style={estilos.filaBotones}>
        <TouchableOpacity style={estilos.botonAgregar} onPress={agregarCliente}>
          <Text style={estilos.textoBoton}>Agregar Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botonCancelar}
          onPress={() => navigation.navigate("Clientes")}
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
  volverIcono: {
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
