/** @format */

import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
// import ProductStack from "./ProductStack";
// import FavoritesScreen from "../screens/Favorites";
// import CartStack from "./CartStack";
import AccountStack from "./AccountStack";
import Menu from "../views/Menu";
import ResumenPedido from "../views/ResumenPedido";
import DetallePlatillo from "../views/DetallePlatillo";
import HomeStack from "./HomeStack";
import CartStack from "./CartStack";
// import Favorites from "../screens/Favorites";
// import Cart from "../screens/Cart";

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.navigation}
        inactiveColor='#fff'
        activeColor='#fff'
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}>
        <Tab.Screen
          name='home'
          component={HomeStack}
          options={{
            title: "Menú",
          }}
        />

        <Tab.Screen
          name='cart'
          component={CartStack}
          options={{
            title: "Carrito",
          }}
        />

        <Tab.Screen
          name='account'
          component={AccountStack}
          options={{
            title: "Cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  let iconName = "";
  switch (route.name) {
    case "home":
      iconName = "home";
      break;
    case "cart":
      iconName = "shopping-cart";
      break;
    case "account":
      iconName = "user-circle";
      break;
    default:
      break;
  }
  return <AwesomeIcon name={iconName} style={[styles.icon]} />;
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
  icon: {
    fontSize: 25,
    color: "#708090",
  },
});
