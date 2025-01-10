import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList,Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MenuLateral from "./BarraLateral";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import logo from "../assets/icon_proveedor.png";

const { width } = Dimensions.get("window");

export default function ListaProveedores({ navigation }) {
  const [proveedores, setProveedores] = useState([]); // Estado para almacenar la lista de proveedores
  const [busqueda, setBusqueda] = useState(""); // Estado para la barra de búsqueda

  // Obtener proveedores desde Firestore al cargar el componente
  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const consulta = await getDocs(collection(FIRESTORE_DB, "proveedores"));
        const datos = consulta.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProveedores(datos); // Guardar los proveedores en el estado
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    };

    obtenerProveedores();
  }, []);

  // Filtrar los proveedores según el texto de búsqueda
  const proveedoresFiltrados = proveedores.filter((proveedor) =>
    proveedor.nombreProveedor.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={estilos.contenedor}>
      {/* Menú lateral */}
      <MenuLateral navigation={navigation} />

      {/* Barra de búsqueda */}
      <View style={estilos.barraBusqueda}>
        <MaterialIcons name="search" size={24} color="#aaa" />
        <TextInput
          style={estilos.inputBusqueda}
          placeholder="Buscar proveedores"
          placeholderTextColor="#aaa"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {/* Encabezado */}
      <Text style={estilos.encabezado}>Proveedores</Text>

      {/* Lista de proveedores */}
      <FlatList
        data={proveedoresFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.itemProveedor}
            onPress={() => navigation.navigate("EditarProveedor", { id: item.id })} // Enviar el ID del proveedor
          >
            <View style={estilos.infoProveedor}>
              {/* Icono del proveedor */}
              <Image source={logo} style={estilos.iconoProveedor}/>
              <View>
                <Text style={estilos.nombreProveedor}>
                  {item.nombreProveedor}
                </Text>
                <Text style={estilos.detalleProveedor}>
                  {item.productoOfrecido}
                </Text>
              </View>
            </View>
            {/* Flecha para navegación */}
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={estilos.textoVacio}>No se encontraron proveedores</Text>
        }
      />

      {/* Botón flotante para agregar proveedores */}
      <TouchableOpacity
        style={estilos.botonFlotante}
        onPress={() => navigation.navigate("AgregarProveedor")}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Barra de navegación inferior */}
      <View style={estilos.barraNavegacion}>
        <TouchableOpacity
          style={estilos.botonNav}
          onPress={() => navigation.navigate("Home")}
        >
          <MaterialIcons name="home" size={30} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botonNav}
          onPress={() => navigation.navigate("Notification")}
        >
          <MaterialIcons name="notifications" size={30} color="#aaa" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos
const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  barraBusqueda: {
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
  itemProveedor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 15,
  },
  infoProveedor: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconoProveedor: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nombreProveedor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detalleProveedor: {
    fontSize: 14,
    color: "blue",
  },
  barraNavegacion: {
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
  botonNav: {
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
