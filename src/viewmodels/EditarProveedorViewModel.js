// src/viewmodels/EditarProveedorViewModel.js
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { Alert } from "react-native";

export function useEditarProveedorViewModel(route, navigation) {
  const { id } = route.params;

  const [nombreProveedor, setNombreProveedor] = useState("");
  const [productoOfrecido, setProductoOfrecido] = useState("");
  const [telefono, setTelefono] = useState("");

  // Obtener datos del proveedor
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

  // Actualizar proveedor
  const actualizarProveedor = async () => {
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

  // Eliminar proveedor
  const eliminarProveedor = async () => {
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

  return {
    nombreProveedor,
    setNombreProveedor,
    productoOfrecido,
    setProductoOfrecido,
    telefono,
    setTelefono,
    actualizarProveedor,
    eliminarProveedor,
  };
}
