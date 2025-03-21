// src/viewmodels/ListaProveedoresViewModel.js
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export function useListaProveedoresViewModel() {
  const [proveedores, setProveedores] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Cargar proveedores desde Firestore
  const cargarProveedores = async () => {
    try {
      const consulta = await getDocs(collection(FIRESTORE_DB, "proveedores"));
      const datos = consulta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProveedores(datos);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  // Filtrar proveedores según el texto de búsqueda
  const proveedoresFiltrados = proveedores.filter((proveedor) =>
    proveedor.nombreProveedor.toLowerCase().includes(busqueda.toLowerCase())
  );

  return {
    busqueda,
    setBusqueda,
    proveedoresFiltrados,
    // Si quieres exponer la función para recargar manualmente:
    cargarProveedores,
  };
}
