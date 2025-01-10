import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default function EditarProveedor({ route, navigation }) {
  // Obtención del ID del proveedor desde las rutas
  const { id } = route.params;

  // Estados para almacenar los datos del proveedor
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [productoOfrecido, setProductoOfrecido] = useState("");
  const [telefono, setTelefono] = useState("");

  // Función para obtener los datos del proveedor desde Firestore
  useEffect(() => {
    const obtenerProveedor = async () => {
      try {
        const referenciaDocumento = doc(FIRESTORE_DB, "proveedores", id);
        const documento = await getDoc(referenciaDocumento);

        if (documento.exists()) {
          const datos = documento.data();
          setNombreProveedor(datos.nombreProveedor);
          setProductoOfrecido(datos.productoOfrecido);
          setTelefono(datos.telefono);
        } else {
          Alert.alert("Error", "Proveedor no encontrado");
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error al obtener proveedor:", error);
        Alert.alert("Error", "No se pudo cargar la información del proveedor");
      }
    };

    obtenerProveedor();
  }, [id]);

  // Función para actualizar los datos del proveedor
  const actualizarDatos = async () => {
    try {
      const referenciaDocumento = doc(FIRESTORE_DB, "proveedores", id);
      await updateDoc(referenciaDocumento, {
        nombreProveedor,
        productoOfrecido,
        telefono,
      });

      Alert.alert("Éxito", "Proveedor actualizado correctamente");
      navigation.navigate("Proveedores");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el proveedor");
    }
  };

  // Función para eliminar un proveedor
  const eliminar = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de querer eliminar este proveedor?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: async () => {
            try {
              const referenciaDocumento = doc(FIRESTORE_DB, "proveedores", id);
              await deleteDoc(referenciaDocumento);
              Alert.alert("Éxito", "Proveedor eliminado correctamente");
              navigation.navigate("Proveedores");
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el proveedor");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={40} color="#ccc" style={estilos.botonRegresar} />
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
        <TouchableOpacity style={estilos.botonGuardar} onPress={actualizarDatos}>
          <Text style={estilos.textoBoton}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botonEliminar} onPress={eliminar}>
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
