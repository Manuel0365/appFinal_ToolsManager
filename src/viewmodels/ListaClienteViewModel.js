// src/viewmodels/ListaClienteViewModel.js
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export function useListaClienteViewModel() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Función para cargar clientes desde Firestore
  const cargarClientes = async () => {
    try {
      const consulta = await getDocs(collection(FIRESTORE_DB, "clientes"));
      const datos = consulta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClientes(datos);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  // Cargar los clientes al montar el ViewModel
  useEffect(() => {
    cargarClientes();
  }, []);

  // Filtrar clientes según el texto de búsqueda
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombreCliente.toLowerCase().includes(busqueda.toLowerCase())
  );

  return {
    busqueda,
    setBusqueda,
    clientesFiltrados,
    // Si deseas exponer la función para recargar manualmente:
    cargarClientes,
  };
}
