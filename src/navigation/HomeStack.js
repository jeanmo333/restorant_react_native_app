/** @format */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import Menu from "../views/Menu";
import DetallePlatillo from "../views/DetallePlatillo";
import ResumenPedido from "../views/ResumenPedido";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: {
          backgroundColor: "#fff",
        },
      }}>
      <Stack.Screen
        name='menu'
        component={Menu}
        options={{
          headerShown: false,
          title: "Menu",
        }}
      />

      <Stack.Screen
        name='DetallePlatillo'
        component={DetallePlatillo}
        options={{
          headerShown: false,
          title: "Detalle Platillo",
        }}
      />
    </Stack.Navigator>
  );
}
