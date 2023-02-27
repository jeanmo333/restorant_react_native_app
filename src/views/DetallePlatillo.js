/** @format */

import React, { useContext, useState, useEffect } from "react";
import { Image, Text, StyleSheet, ScrollView, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PedidoContext from "../context/pedidos/pedidosContext";
import ScreenLoading from "../components/ScreenLoading";
import Quantity from "../components/product/Quantity";
import colors from "../styles/colors";
import format from "../utils/format";
import { Button } from "react-native-paper";

const DetallePlatillo = () => {
  const [quantity, setQuantity] = useState(1);
  const [subTotal, guardarSubTotal] = useState(0);
  // Pedido context
  const { platillo, guardarPedido } = useContext(PedidoContext);
  const { nombre, imagen, descripcion, precio } = platillo;

  // Redireccionar
  const navigation = useNavigation();

  // En cuanto el componente carga, calcular la cantidad a pagar
  useEffect(() => {
    calcularTotal();
  }, [quantity]);

  // Calcula el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = precio * quantity;
    guardarSubTotal(totalPagar);
  };

  // Confirma si la orden es correcta
  const agregarPedido = () => {
    Alert.alert(
      "¿Deseas agregar este platillo?",
      "Un platillo agregado ya no se podrá modificar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            // Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              quantity,
              subTotal,
            };

            // console.log(pedido);
            guardarPedido(pedido);

            // Navegar hacia el Resumen
            navigation.navigate("ResumenPedido");
          },
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <>
      {!platillo ? (
        <ScreenLoading text='Cargando platillo' size='large' />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.nombre}>{nombre}</Text>
          <View style={styles.containerImage}>
            <Image
              style={styles.image}
              source={{
                uri: `${imagen}`,
              }}
            />
          </View>

          <Text
            style={styles.descripcion}
            numberOfLines={3}
            ellipsizeMode='tail'>
            {descripcion}
          </Text>

          <View style={styles.conatinerData}>
            <Text style={styles.dataText}>Precio:</Text>
            <Text style={styles.dataValue}>{format(subTotal)}</Text>
          </View>

          <Quantity quantity={quantity} setQuantity={setQuantity} />

          <Button
            mode='contained'
            contentStyle={styles.btnBuyContent}
            labelStyle={styles.btnLabel}
            style={styles.btn}
            onPress={() => agregarPedido()}>
            Agregar al pedido
          </Button>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 50,
    marginTop: 5,
    marginHorizontal: 20,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 8,
  },
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
  btnBuyLabel: {
    fontSize: 18,
  },
  btnBuy: {
    marginTop: 20,
  },
  containerImage: {
    width: "100%",
    height: 250,
  },
  descripcion: {
    textAlign: "justify",
    marginTop: 10,
    fontSize: 15,
    color: "gray",
  },
  image: {
    height: "100%",
    borderRadius: 10,
  },

  conatinerData: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  dataText: {
    fontSize: 23,
    color: "#747474",
    textAlign: "right",
    fontWeight: "bold",
  },
  dataValue: {
    fontSize: 20,
    paddingLeft: 5,
    fontWeight: "bold",
  },
  currentPrice: {
    fontSize: 18,
  },
  saving: {
    color: colors.primary,
  },

  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 25,
  },
  btnBuyContent: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
  },
});

export default DetallePlatillo;
