// src/viewmodels/EditarClienteViewModel.js
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { Alert } from "react-native";

export function useEditarClienteViewModel(route, navigation) {
  const { id } = route.params;
  const [nombreCliente, setNombreCliente] = useState("");
  const [deuda, setDeuda] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");

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
          navigation.goBack();
        }
      } catch (error) {
        console.error("Error al obtener cliente:", error);
        Alert.alert("Error", "No se pudo cargar la información del cliente");
      }
    };

    obtenerCliente();
  }, [id]);

  // Actualizar datos del cliente
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

  // Eliminar cliente
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

  return {
    nombreCliente,
    setNombreCliente,
    deuda,
    setDeuda,
    fechaCompra,
    setFechaCompra,
    actualizarCliente,
    eliminarCliente,
  };
}
