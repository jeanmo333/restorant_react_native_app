/** @format */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import ResumenPedido from "../views/ResumenPedido";
import ProgresoPedido from "../views/ProgresoPedido";

const Stack = createStackNavigator();

export default function CartStack() {
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
        name='ResumenPedido'
        component={ResumenPedido}
        options={{
          headerShown: false,
          title: "Pedido",
        }}
      />

      <Stack.Screen
        name='ProgresoPedido'
        component={ProgresoPedido}
        options={{
          headerShown: false,
          title: "Progreso de Pedido",
        }}
      />
    </Stack.Navigator>
  );
}
