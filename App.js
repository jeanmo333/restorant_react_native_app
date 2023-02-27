/** @format */

// import { LogBox } from "react-native";

import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

import Menu from "./src/views/Menu";
import DetallePlatillo from "./src/views/DetallePlatillo";
import ResumenPedido from "./src/views/ResumenPedido";
import ProgresoPedido from "./src/views/ProgresoPedido";
import AppNavigation from "./src/navigation/AppNavigation";
import colors from "./src/styles/colors";

// importar state de context
import FirebaseState from "./src/context/firebase/firebaseState";
import PedidoState from "./src/context/pedidos/pedidosState";

// Components
import BotonResumen from "./src/components/ui/BotonResumen";

const Stack = createStackNavigator();

// LogBox.ignoreLogs([
//   "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
// ]);

const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidoState>
          <PaperProvider>
            {/* <AppNavigation /> */}
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: colors.primary,
                  },
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                  headerTintColor: "#000",
                }}>
                <Stack.Screen
                  name='menu'
                  component={Menu}
                  options={{
                    title: "Menú",
                    headerRight: (props) => <BotonResumen />,
                  }}
                />

                <Stack.Screen
                  name='DetallePlatillo'
                  component={DetallePlatillo}
                  options={{
                    title: "Detalle Platillo",
                  }}
                />

                <Stack.Screen
                  name='ResumenPedido'
                  component={ResumenPedido}
                  options={{
                    title: "Resumen",
                  }}
                />

                <Stack.Screen
                  name='ProgresoPedido'
                  component={ProgresoPedido}
                  options={{
                    title: "Progreso de Pedido",
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </PedidoState>
      </FirebaseState>
    </>
  );
};
export default App;
