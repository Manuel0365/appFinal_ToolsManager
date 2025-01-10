import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default function EditarCliente({ route, navigation }) {
  const { id } = route.params; // Recibe el ID del cliente desde la navegación
  const [nombreCliente, setNombreCliente] = useState(""); // Estado para el nombre del cliente
  const [deuda, setDeuda] = useState(""); // Estado para la deuda del cliente
  const [fechaCompra, setFechaCompra] = useState(""); // Estado para la fecha de compra del cliente

  // Obtener los datos del cliente desde Firestore
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const referenciaDocumento = doc(FIRESTORE_DB, "clientes", id);
        const documento = await getDoc(referenciaDocumento);

        if (documento.exists()) {
          const datos = documento.data();
          setNombreCliente(datos.nombreCliente);
          setDeuda(datos.deuda);
          setFechaCompra(datos.fechaCompra);
        } else {
          Alert.alert("Error", "Cliente no encontrado");
          navigation.goBack(); // Volver a la pantalla anterior si no se encuentra el cliente
        }
      } catch (error) {
        console.error("Error al obtener cliente:", error);
        Alert.alert("Error", "No se pudo cargar la información del cliente");
      }
    };

    obtenerCliente();
  }, [id]);

  // Función para actualizar los datos del cliente en Firestore
  const actualizarCliente = async () => {
    try {
      const referenciaDocumento = doc(FIRESTORE_DB, "clientes", id);
      await updateDoc(referenciaDocumento, {
        nombreCliente,
        deuda,
        fechaCompra,
      });

      Alert.alert("Éxito", "Cliente actualizado correctamente");
      navigation.navigate("Clientes");
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      Alert.alert("Error", "No se pudo actualizar el cliente");
    }
  };

  // Función para eliminar el cliente de Firestore
  const eliminarCliente = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de querer eliminar este cliente?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          onPress: async () => {
            try {
              const referenciaDocumento = doc(FIRESTORE_DB, "clientes", id);
              await deleteDoc(referenciaDocumento);
              Alert.alert("Éxito", "Cliente eliminado correctamente");
              navigation.navigate("Clientes");
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el cliente");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity onPress={() => navigation.navigate("Clientes")}>
        <Ionicons name="arrow-back" size={40} color="#ccc" style={estilos.iconoVolver} />
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
        <TouchableOpacity style={estilos.botonGuardar} onPress={actualizarCliente}>
          <Text style={estilos.textoBoton}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botonEliminar} onPress={eliminarCliente}>
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
