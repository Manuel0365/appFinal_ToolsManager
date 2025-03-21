// src/viewmodels/ListaProductosViewModel.js
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

export function useListaProductosViewModel() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Función para cargar productos desde Firestores
  const cargarProductos = async () => {
    try {
      const consulta = await getDocs(collection(FIRESTORE_DB, "productos"));
      const datos = consulta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(datos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Cargar los productos al montar
  useEffect(() => {
    cargarProductos();
  }, []);

  // Filtrar productos según el texto de búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return {
    busqueda,
    setBusqueda,
    productosFiltrados,
    // Si quieres exponer la función para recargar manualmente:
    cargarProductos,
  };
}
