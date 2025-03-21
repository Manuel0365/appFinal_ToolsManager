// src/viewmodels/EditarProductoViewModel.js
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { Alert } from "react-native";

export function useEditarProductoViewModel(route, navigation) {
  const { id } = route.params;

  const [nombreProducto, setNombreProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidadesDisponibles, setUnidadesDisponibles] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");

  // Cargar datos del producto
  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const referenciaDocumento = doc(FIRESTORE_DB, "productos", id);
        const documento = await getDoc(referenciaDocumento);

        if (documento.exists()) {
          const datos = documento.data();
          setNombreProducto(datos.nombreProducto);
          setCategoria(datos.categoria);
          setDescripcion(datos.descripcion);
          setUnidadesDisponibles(datos.unidadesDisponibles.toString());
          setPrecioVenta(datos.precioVenta.toString());
        } else {
          Alert.alert("Error", "Producto no encontrado");
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar la información del producto");
      }
    };

    obtenerProducto();
  }, [id]);

  // Actualizar producto
  const actualizarProducto = async () => {
    try {
      const referenciaDocumento = doc(FIRESTORE_DB, "productos", id);
      await updateDoc(referenciaDocumento, {
        nombreProducto,
        categoria,
        descripcion,
        unidadesDisponibles: parseInt(unidadesDisponibles),
        precioVenta: parseFloat(precioVenta),
      });

      Alert.alert("Éxito", "Producto actualizado correctamente");
      navigation.navigate("Inventario");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      Alert.alert("Error", "No se pudo actualizar el producto");
    }
  };

  // Eliminar producto
  const eliminarProducto = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de querer eliminar este producto?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          onPress: async () => {
            try {
              const referenciaDocumento = doc(FIRESTORE_DB, "productos", id);
              await deleteDoc(referenciaDocumento);
              Alert.alert("Éxito", "Producto eliminado correctamente");
              navigation.navigate("Inventario");
            } catch (error) {
              console.error("Error al eliminar producto:", error);
              Alert.alert("Error", "No se pudo eliminar el producto");
            }
          },
        },
      ]
    );
  };

  return {
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
  };
}
