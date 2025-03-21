// src/views/Movimientos/HistorialMovimientosScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../../firebaseConfig"; // Importa la referencia de Firestore

export default function HistorialMovimientosScreen() {
  const [movimientos, setMovimientos] = useState([]);

  // Cargar los movimientos de inventario
  useEffect(() => {
    const obtenerMovimientos = async () => {
      const movimientosRef = collection(FIRESTORE_DB, "historyMovInv");
      const querySnapshot = await getDocs(movimientosRef);
      const movimientosData = querySnapshot.docs.map((doc) => doc.data());
      setMovimientos(movimientosData);
    };

    obtenerMovimientos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial de Movimientos</Text>
      <FlatList
        data={movimientos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Tipo de Movimiento: {item.tipoMovimiento}</Text>
            <Text>Producto: {item.nombreProducto}</Text>
            <Text>
              Fecha: {item.fecha ? item.fecha.toDate().toString() : "N/A"}
            </Text>
            {/* Muestra los cambios en un formato más legible */}
            <Text>Detalles de Cambios: {JSON.stringify(item.cambios)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
});
