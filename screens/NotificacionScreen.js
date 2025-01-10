import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MenuLateral from "./BarraLateral";

const { width } = Dimensions.get("window");

export default function PantallaNotificacion({navigation}) {
  return (
    <View style={styles.container}>
      <MenuLateral navigation={navigation} />
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Encabezado */}
      <Text style={styles.header}>Notificaciones</Text>

      {/* Lista de advertencias */}

      <View style={styles.notifications}>
        <TouchableOpacity style={styles.warningItem}>
          <View>
            <Text style={styles.warningTitle}>Faltan más brochas</Text>
            <Text style={styles.warningSubtitle}>Solo quedan 1</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.warningItem}>
          <View>
            <Text style={styles.warningTitle}>Faltan más latas de pintura</Text>
            <Text style={styles.warningSubtitle}>
              Actualmente no hay nada
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Home")}>
        <MaterialIcons name="home" size={30} color="#aaa" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Notification")}>
        <MaterialIcons name="notifications" size={30} color="#aaa" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 100
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  notifications: {
    marginBottom: 20,
  },
  warningItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 15,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  warningSubtitle: {
    fontSize: 14,
    color: "blue",
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
  navButton: {
    alignItems: "center",
    justifyContent: "center",
  }
});
