import { useState } from "react";
import { Alert } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { Cliente } from "../models/Cliente";

export const useClienteViewModel = (navigation) => {
  const [nombreCliente, setNombreCliente] = useState("");
  const [deuda, setDeuda] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");

  const agregarCliente = async () => {
    if (!nombreCliente.trim() || !deuda.trim() || !fechaCompra.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const formatoFecha = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!formatoFecha.test(fechaCompra)) {
      Alert.alert("Error", "La fecha debe estar en formato DD/MM/AAAA");
      return;
    }

    const nuevoCliente = new Cliente(nombreCliente, deuda, fechaCompra);

    try {
      await addDoc(collection(FIRESTORE_DB, "clientes"), {
        nombreCliente: nuevoCliente.nombreCliente,
        deuda: nuevoCliente.deuda,
        fechaCompra: nuevoCliente.fechaCompra,
      });

      Alert.alert("Éxito", "Cliente agregado correctamente");
      navigation.navigate("Clientes");
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      Alert.alert("Error", "No se pudo agregar el cliente");
    }
  };

  return {
    nombreCliente,
    deuda,
    fechaCompra,
    setNombreCliente,
    setDeuda,
    setFechaCompra,
    agregarCliente,
  };
};
