import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MenuLateral from "../screens/BarraLateral";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import logo from "../assets/icon_producto.png";

const { width } = Dimensions.get("window");

export default function ListaProductos({ navigation }) {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto de búsqueda

  // Obtener productos desde Firestore
  useEffect(() => {
    const obtenerProductos = async () => {
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

    obtenerProductos();
  }, []);

  // Filtrar productos según el texto de búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={estilos.contenedor}>
      <MenuLateral navigation={navigation} />

      {/* Barra de búsqueda */}
      <View style={estilos.contenedorBusqueda}>
        <MaterialIcons name="search" size={24} color="#aaa" />
        <TextInput
          style={estilos.inputBusqueda}
          placeholder="Buscar producto"
          placeholderTextColor="#aaa"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {/* Encabezado */}
      <Text style={estilos.encabezado}>Productos</Text>

      {/* Lista de productos */}
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.itemProducto}
            onPress={() =>
              navigation.navigate("EditarProducto", { id: item.id })
            }
          >
            <View style={estilos.infoProducto}>
              {/* Ícono del producto */}
              <Image source={logo} style={estilos.iconoProducto}/>
              <View>
                <Text style={estilos.nombreProducto}>{item.nombreProducto}</Text>
                <Text style={estilos.detalleProducto}>{item.categoria}</Text>
              </View>
            </View>
            {/* Flecha para navegación */}
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={estilos.textoVacio}>No se encontraron productos</Text>
        }
      />

      {/* Botón flotante para agregar un producto */}
      <TouchableOpacity
        style={estilos.botonFlotante}
        onPress={() => navigation.navigate("AgregarProducto")}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Barra de navegación inferior */}
      <View style={estilos.navBar}>
        <TouchableOpacity
          style={estilos.botonNavegacion}
          onPress={() => navigation.navigate("Home")}
        >
          <MaterialIcons name="home" size={30} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botonNavegacion}
          onPress={() => navigation.navigate("Notification")}
        >
          <MaterialIcons name="notifications" size={30} color="#aaa" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  contenedorBusqueda: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 100,
  },
  inputBusqueda: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  encabezado: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  itemProducto: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 15,
  },
  infoProducto: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconoProducto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nombreProducto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detalleProducto: {
    fontSize: 14,
    color: "blue",
  },
  textoVacio: {
    textAlign: "center",
    fontSize: 16,
    color: "#aaa",
  },
  navBar: {
    position: "absolute",
    bottom: 10,
    width: width,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  botonNavegacion: {
    alignItems: "center",
    justifyContent: "center",
  },
  botonFlotante: {
    position: "absolute",
    bottom: 100,
    right: 40,
    backgroundColor: "orange",
    width: 75,
    height: 75,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
