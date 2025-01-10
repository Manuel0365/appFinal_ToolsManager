import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//Pantallas de la app
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import CrearCuentaScreen from "./screens/CrearCuentaScreen";
import HomeScreen from "./screens/HomeScreen";
import NotificacionScreen from "./screens/NotificacionScreen"
import ListaProveedoresScreen from "./screens/ListaProvScreen";
import ListaClientesScreen from "./screens/ListaClienteScreen";
import ListaProductos from "./screens/ListaProductosScreen";
import AgregarProveedor from "./screens/AgregarProveedor"
import AgregarCliente from "./screens/AgregarCliente"
import AgregarProducto from "./screens/AgregarProducto"
import EditarProveedor from "./screens/EditarProveedor"
import EditarCliente from "./screens/EditarCliente"
import EditarProducto from "./screens/EditarProducto"

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
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CuentaNueva" component={CrearCuentaScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={NotificacionScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Proveedores" component={ListaProveedoresScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Clientes" component={ListaClientesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Inventario" component={ListaProductos} options={{ headerShown: false }}/>
        <Stack.Screen name="AgregarProveedor" component={AgregarProveedor} options={{ headerShown: false }}/>
        <Stack.Screen name="AgregarCliente" component={AgregarCliente} options={{ headerShown: false }}/>
        <Stack.Screen name="AgregarProducto" component={AgregarProducto} options={{ headerShown: false }}/>
        <Stack.Screen name="EditarProveedor" component={EditarProveedor} options={{ headerShown: false }}/>
        <Stack.Screen name="EditarCliente" component={EditarCliente} options={{ headerShown: false }}/>
        <Stack.Screen name="EditarProducto" component={EditarProducto} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}