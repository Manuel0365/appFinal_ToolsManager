// src/viewmodels/ProveedorViewModel.js
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { Proveedor } from "../models/Proveedor";
import { Alert } from "react-native";

export function useProveedorViewModel(navigation) {
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [productoOfrecido, setProductoOfrecido] = useState("");
  const [telefono, setTelefono] = useState("");

  const agregarProveedor = async () => {
    const nuevoProveedor = new Proveedor(
      nombreProveedor,
      productoOfrecido,
      telefono
    );

    // Validación de datos usando el modelo
    if (!nuevoProveedor.validarDatos()) {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    try {
      const referenciaProveedores = collection(FIRESTORE_DB, "proveedores");
      await addDoc(referenciaProveedores, { ...nuevoProveedor });

      Alert.alert("Éxito", "Proveedor registrado correctamente");
      navigation.navigate("Proveedores");
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el proveedor");
      console.error("Error al agregar proveedor:", error);
    }
  };

  return {
    nombreProveedor,
    setNombreProveedor,
    productoOfrecido,
    setProductoOfrecido,
    telefono,
    setTelefono,
    agregarProveedor,
  };
}
