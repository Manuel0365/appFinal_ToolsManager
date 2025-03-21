// src/viewmodels/ProductoViewModel.js
import { useState } from "react";
import { Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { Producto } from "../models/Producto";

export const useProductoViewModel = (navigation) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidadesDisponibles, setUnidadesDisponibles] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");

  const agregarProducto = async () => {
    if (
      !nombreProducto ||
      !categoria ||
      !descripcion ||
      !unidadesDisponibles ||
      !precioVenta
    ) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const nuevoProducto = new Producto(
      nombreProducto,
      categoria,
      descripcion,
      unidadesDisponibles,
      precioVenta
    );

    try {
      await addDoc(collection(FIRESTORE_DB, "productos"), { ...nuevoProducto });
      Alert.alert("Éxito", "Producto agregado correctamente");
      navigation.navigate("Inventario");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      Alert.alert("Error", "No se pudo agregar el producto");
    }
  };

  return {
    nombreProducto,
    categoria,
    descripcion,
    unidadesDisponibles,
    precioVenta,
    setNombreProducto,
    setCategoria,
    setDescripcion,
    setUnidadesDisponibles,
    setPrecioVenta,
    agregarProducto,
  };
};
