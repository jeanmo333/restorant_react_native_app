/** @format */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../views/Account";
// import ChangeName from "../screens/Account/ChangeName";
// import ChangeEmail from "../screens/Account/ChangeEmail";
// import ChangeUsername from "../screens/Account/ChangeUsername";
// import ChangePassword from "../screens/Account/ChangePassword";
// import Addresses from "../screens/Account/Addresses";
// import AddAddress from "../screens/Account/AddAddress";
// import Orders from "../screens/Account/Orders";
import colors from "../styles/colors";
import Pedidos from "../views/Pedidos";

const Stack = createStackNavigator();

export default function AccountStack() {
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
        name='account-stack'
        component={Account}
        options={{ title: "Cuenta", headerShown: false }}
      />

      <Stack.Screen
        name='orders'
        component={Pedidos}
        options={{
          title: "Mis pedidos",
        }}
      />
    </Stack.Navigator>
  );
}
