import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MenuLateral from "../screens/BarraLateral";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import logo from "../assets/icon_cliente.png";

const { width } = Dimensions.get("window");

export default function PantallaClientes({ navigation }) {
  const [clientes, setClientes] = useState([]); // Estado para almacenar clientes
  const [busqueda, setBusqueda] = useState(""); // Estado para el texto de búsqueda

  // Obtener clientes desde Firestore al cargar el componente
  useEffect(() => {
    const obtenerClientes = async () => {
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

    obtenerClientes();
  }, []);

  // Filtrar clientes según el texto de búsqueda
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombreCliente.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={estilos.contenedor}>
      <MenuLateral navigation={navigation} />

      {/* Barra de búsqueda */}
      <View style={estilos.barraBusqueda}>
        <MaterialIcons name="search" size={24} color="#aaa" />
        <TextInput
          style={estilos.inputBusqueda}
          placeholder="Buscar clientes"
          placeholderTextColor="#aaa"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      {/* Encabezado */}
      <Text style={estilos.encabezado}>Clientes</Text>

      {/* Lista de clientes */}
      <FlatList
        data={clientesFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.elementoCliente}
            onPress={() => navigation.navigate("EditarCliente", { id: item.id })}
          >
            <View style={estilos.informacionCliente}>
              {/* Ícono del cliente */}
              <Image source={logo} style={estilos.iconoCliente}/>
              <View>
                <Text style={estilos.nombreCliente}>{item.nombreCliente}</Text>
                <Text style={estilos.detalleCliente}>Deuda: ${item.deuda}</Text>
              </View>
            </View>

            {/* Flecha para navegación */}
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={estilos.textoVacio}>No se encontraron clientes</Text>
        }
      />

      {/* Botón flotante para agregar cliente */}
      <TouchableOpacity
        style={estilos.botonFlotante}
        onPress={() => navigation.navigate("AgregarCliente")}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Barra de navegación inferior */}
      <View style={estilos.barraNavegacion}>
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
  elementoCliente: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 15,
  },
  informacionCliente: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconoCliente: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nombreCliente: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  detalleCliente: {
    fontSize: 14,
    color: "blue",
  },
  textoVacio: {
    textAlign: "center",
    fontSize: 16,
    color: "#aaa",
    marginTop: 20,
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
