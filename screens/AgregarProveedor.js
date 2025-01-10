import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE_DB } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export default function RegistrarProveedor({ navigation }) {
  // Estados para capturar los datos del proveedor
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [productoOfrecido, setProductoOfrecido] = useState("");
  const [telefono, setTelefono] = useState("");

  // Función para manejar la adición del proveedor
  const manejarAgregarProveedor = async () => {
    // Validar que los campos no estén vacíos
    if (!nombreProveedor.trim() || !productoOfrecido.trim() || !telefono.trim()) {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    try {
      // Enviar los datos a Firestore
      const referenciaProveedores = collection(FIRESTORE_DB, "proveedores");
      await addDoc(referenciaProveedores, {
        nombreProveedor,
        productoOfrecido,
        telefono,
      });

      Alert.alert("Éxito", "Proveedor registrado correctamente");
      navigation.navigate("Proveedores"); // Redirige a la pantalla de Proveedores
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el proveedor");
    }
  };

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
          onPress={manejarAgregarProveedor}
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
