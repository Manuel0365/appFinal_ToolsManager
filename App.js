import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//Pantallas de la app
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./src/views/Login/LoginScreen";
import CrearCuentaScreen from "./src/views/Login/CrearCuentaScreen";
import HomeScreen from "./screens/HomeScreen";
import NotificacionScreen from "./screens/NotificacionScreen";
import ListaProveedoresScreen from "./src/views/Proveedores/ListaProvScreen";
import ListaClientesScreen from "./src/views/Clientes/ListaClienteScreen";
import ListaProductos from "./src/views/Productos/ListaProductosScreen";
import AgregarProveedor from "./src/views/Proveedores/AgregarProveedor";
import AgregarCliente from "./src/views/Clientes/AgregarCliente";
import AgregarProducto from "./src/views/Productos/AgregarProducto";
import EditarProveedor from "./src/views/Proveedores/EditarProveedor";
import EditarCliente from "./src/views/Clientes/EditarCliente";
import EditarProducto from "./src/views/Productos/EditarProducto";
import HistorialMovimientosScreen from "./src/views/Movimientos/HistorialMovimientosScreen"; // Importar la nueva pantal

import { useEffect, useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1500); // Tiempo para la SplashScreen
  }, []);

  if (showSplash) {
    return <SplashScreen />; // Renderiza la SplashScreen directamente
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CuentaNueva"
          component={CrearCuentaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HistorialMovimientos"
          component={HistorialMovimientosScreen}
          options={{ headerShown: true, title: "Historial de Movimientos" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificacionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Proveedores"
          component={ListaProveedoresScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Clientes"
          component={ListaClientesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inventario"
          component={ListaProductos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AgregarProveedor"
          component={AgregarProveedor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AgregarCliente"
          component={AgregarCliente}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AgregarProducto"
          component={AgregarProducto}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditarProveedor"
          component={EditarProveedor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditarCliente"
          component={EditarCliente}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditarProducto"
          component={EditarProducto}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
