import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export default function EditarProducto({ route, navigation }) {
  const { id } = route.params;
  
  // Estados para manejar los datos del producto
  const [nombreProducto, setNombreProducto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidadesDisponibles, setUnidadesDisponibles] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");

  // Cargar datos del producto desde Firestore
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
          setUnidadesDisponibles(datos.unidadesDisponibles.toString()); // Convertir número a texto
          setPrecioVenta(datos.precioVenta.toString()); // Convertir número a texto
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

  // Actualizar producto en Firestore
  const actualizarProducto = async () => {
    try {
      const referenciaDocumento = doc(FIRESTORE_DB, "productos", id);
      await updateDoc(referenciaDocumento, {
        nombreProducto,
        categoria,
        descripcion,
        unidadesDisponibles: parseInt(unidadesDisponibles), // Convertir texto a número
        precioVenta: parseFloat(precioVenta), // Convertir texto a número
      });

      Alert.alert("Éxito", "Producto actualizado correctamente");
      navigation.navigate("Inventario");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      Alert.alert("Error", "No se pudo actualizar el producto");
    }
  };

  // Eliminar producto de Firestore
  const eliminar = async () => {
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

  return (
    <View style={estilos.contenedor}>
      {/* Botón para regresar */}
      <TouchableOpacity onPress={() => navigation.navigate("Inventario")}>
        <Ionicons name="arrow-back" size={40} color="#ccc" style={estilos.flechaAtras} />
      </TouchableOpacity>

      <Text style={estilos.titulo}>Editar Producto</Text>

      {/* Campos de entrada */}
      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Nombre del producto:</Text>
        <TextInput
          style={estilos.entrada}
          value={nombreProducto}
          onChangeText={setNombreProducto}
        />
      </View>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Categoría:</Text>
        <TextInput
          style={estilos.entrada}
          value={categoria}
          onChangeText={setCategoria}
        />
      </View>

      <View style={estilos.grupoEntrada}>
        <Text style={estilos.etiqueta}>Descripción:</Text>
        <TextInput
          style={[estilos.entrada, estilos.entradaDescripcion]}
          multiline
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>

      <View style={estilos.fila}>
        <View style={estilos.grupoMitad}>
          <Text style={estilos.etiqueta}>Unidades Disponibles:</Text>
          <TextInput
            style={estilos.entrada}
            keyboardType="numeric"
            value={unidadesDisponibles}
            onChangeText={setUnidadesDisponibles}
          />
        </View>
        <View style={estilos.grupoMitad}>
          <Text style={estilos.etiqueta}>Precio de Venta:</Text>
          <TextInput
            style={estilos.entrada}
            placeholder="$"
            keyboardType="numeric"
            value={precioVenta}
            onChangeText={setPrecioVenta}
          />
        </View>
      </View>

      {/* Botones de acción */}
      <View style={estilos.filaBotones}>
        <TouchableOpacity style={estilos.botonGuardar} onPress={actualizarProducto}>
          <Text style={estilos.textoBoton}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botonEliminar} onPress={eliminar}>
          <Text style={estilos.textoBoton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  flechaAtras: {
    marginTop: 30,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF7F00",
    textAlign: "center",
    marginVertical: 20,
    marginBottom: 60
  },
  grupoEntrada: {
    marginBottom: 20,
  },
  grupoMitad: {
    width: "48%",
  },
  etiqueta: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    fontWeight: "bold",
  },
  entrada: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  entradaDescripcion: {
    height: 60,
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filaBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
  },
  botonGuardar: {
    backgroundColor: "#0056D2",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  botonEliminar: {
    backgroundColor: "#FF4D4D",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
