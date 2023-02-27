/** @format */

import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Divider } from "react-native-paper";
import PedidoContext from "../context/pedidos/pedidosContext";
import firebase from "../firebase";
import format from "../utils/format";
import colors from "../styles/colors";
import ScreenLoading from "../components/ScreenLoading";
import { size } from "lodash";
import NotProducts from "../components/NotProducts";

export default function ResumenPedido() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // context de pedido
  const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } =
    useContext(PedidoContext);

  //console.log(pedido)
  useEffect(() => {
    calcularTotal();
  }, [pedido]);

  const calcularTotal = () => {
    let nuevoTotal = 0;
    nuevoTotal = pedido.reduce(
      (nuevoTotal, articulo) => nuevoTotal + articulo.subTotal,
      0
    );

    mostrarResumen(nuevoTotal);
  };

  // redirecciona a Progreso pedido
  const progresoPedido = () => {
    Alert.alert(
      "Revisa tu pedido",
      "Una vez que realizas tu pedido, no podrás cambiarlo",
      [
        {
          text: "Confirmar",
          onPress: async () => {
            // crear un objeto
            const pedidoObj = {
              tiempoentrega: 0,
              completado: false,
              total: Number(total),
              orden: pedido,
              creado: Date.now(),
            };

            // console.log(pedidoObj);

            try {
              setLoading(true);
              const pedido = await firebase.db
                .collection("ordenes")
                .add(pedidoObj);
              setLoading(false);
              pedidoRealizado(pedido.id);

              // redireccionar a progreso
              navigation.navigate("ProgresoPedido");
              // navigation.navigate("account", { screen: "orders" });
            } catch (error) {
              console.log(error);
            }
          },
        },
        { text: "Revisar", style: "cancel" },
      ]
    );
  };

  // Elimina un producto del arreglo de pedido
  const confirmarEliminacion = (id) => {
    Alert.alert(
      "¿Deseas eliminar este platillo?",
      "Una vez eliminado no se puede recuperar",
      [
        {
          text: "Confirmar",
          onPress: () => {
            // Eliminar del state
            eliminarProducto(id);
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  if (!pedido || size(pedido) === 0) return <NotProducts />;

  return (
    <ScrollView>
      <Text style={styles.textResumen}>Resumen del Pedido</Text>
      <Divider style={styles.divider} />

      {pedido.map((platillo, i) => {
        const {
          imagen,
          nombre,
          descripcion,
          categoria,
          precio,
          subTotal,
          quantity,
          id,
        } = platillo;

        return (
          <View style={styles.product} key={id + i}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: `${imagen}`,
                }}
              />
            </View>
            <View style={styles.info}>
              <View>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                  ellipsizeMode='tail'>
                  {nombre}
                </Text>
                <View style={styles.prices}>
                  <Text style={styles.dataText}>Subtotal: </Text>
                  <Text style={styles.dataValue}>{format(subTotal)}</Text>
                </View>

                <View style={styles.prices}>
                  <Text style={styles.dataText}>Cantidad: </Text>
                  <Text style={styles.dataValue}>{quantity}</Text>
                </View>
              </View>

              <Button
                style={styles.btnDelete}
                mode='contained'
                onPress={() => confirmarEliminacion(id)}>
                Eliminar
              </Button>
            </View>
          </View>
        );
      })}

      <View style={styles.containerTotal}>
        <Text style={styles.dataTextTotal}>Total a pagar: </Text>
        <Text style={styles.dataValueTotal}>{format(total)}</Text>
      </View>

      <Button
        mode='contained'
        contentStyle={styles.btnBuyContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={() => navigation.navigate("menu")}>
        Seguir pidiendo
      </Button>

      <Button
        mode='contained'
        contentStyle={styles.btnConfirmar}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        loading={loading}
        onPress={() => progresoPedido()}>
        {!loading && "Ordenar pedido"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    // borderRadius: 5,
    // borderWidth: 0.5,
    // borderColor: colors.primary,
    height: 170,
    position: "relative",
    marginHorizontal: 20,
  },
  containerImage: {
    width: "40%",
    height: 170,
    padding: 5,
  },
  image: {
    height: "100%",
    borderRadius: 10,
  },
  info: {
    padding: 10,
    width: "60%",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  dataValue: {
    fontSize: 15,
    fontWeight: "bold",
  },
  dataText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
  },
  btnsContainer: {
    justifyContent: "space-between",

    width: "100%",
  },
  selectQuantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  btnQuantity: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    margin: 0,
  },
  inputQuantity: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  btnDelete: {
    backgroundColor: colors.danger,
  },
  reload: {
    backgroundColor: "#000",
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  textResumen: {
    fontSize: 25,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  containerTotal: {
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 22,
  },
  dataTextTotal: {
    fontSize: 19,
    fontWeight: "bold",
    color: "grey",
  },
  dataValueTotal: {
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    padding: 3,
    marginHorizontal: 20,
    backgroundColor: colors.primary,
  },
  btnLabel: {
    fontSize: 18,
  },
  btn: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  btnBuyContent: {
    backgroundColor: colors.bgDark,
    paddingVertical: 5,
  },
  btnConfirmar: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
  },
});
