/** @format */

import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import PedidoContext from "../../context/pedidos/pedidosContext";
import colors from "../../styles/colors";

const BotonResumen = () => {
  const navigation = useNavigation();

  // Leer el objeto de pedido
  const { pedido } = useContext(PedidoContext);

  if (pedido.length === 0) return null;

  return (
    <Button
      onPress={() => navigation.navigate("ResumenPedido")}
      style={styles.boton}>
      <Text style={styles.botonTexto}>VOLVER AL PEDIDO</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: colors.primary,
    marginRight: 30,
    fontWeight: "bold",
  },
  botonTexto: {
    fontSize: 15.5,
    color: colors.fontLight,
  },
});

export default BotonResumen;
