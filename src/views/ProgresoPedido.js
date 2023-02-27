/** @format */

import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import PedidoContext from "../context/pedidos/pedidosContext";
import firebase from "../firebase";
import Countdown from "react-countdown";
import { Button } from "react-native-paper";

const ProgresoPedido = () => {
  const navigation = useNavigation();

  const { idpedido } = useContext(PedidoContext);

  //console.log(idpedido);

  const [tiempo, guardarTiempo] = useState(0);
  const [completado, guardarCompletado] = useState(false);

  useEffect(() => {
    const obtenerProducto = () => {
      firebase.db
        .collection("ordenes")
        .doc(idpedido)
        .onSnapshot(function (doc) {
          guardarTiempo(doc.data().tiempoentrega);
          guardarCompletado(doc.data().completado);
        });
    };
    obtenerProducto();
  }, []);

  // Muestra el countdown en la pantalla
  const renderer = ({ minutes, seconds }) => {
    return (
      <Text style={styles.tiempo}>
        {minutes}:{seconds}{" "}
      </Text>
    );
  };

  return (
    <View style={globalStyles.contenedor}>
      <View style={[globalStyles.contenido, { marginTop: 50 }]}>
        {/* <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 60,
          }}>
          Progreso del pedido
        </Text> */}
        {tiempo === 0 && (
          <>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 5,
              }}>
              Hemos recibido tu orden...
            </Text>
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
              Estamos calculando el tiempo de entrega
            </Text>
          </>
        )}

        {!completado && tiempo > 0 && (
          <>
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
              Su orden estará lista en:{" "}
            </Text>
            <Text style={{ textAlign: "center" }}>
              <Countdown
                date={Date.now() + tiempo * 60000}
                renderer={renderer}
              />
            </Text>
          </>
        )}

        {completado && (
          <>
            <Text style={styles.textoCompletadoLista}>Orden Lista</Text>
            <Text style={styles.textoCompletadoRecoger}>
              Por favor, pase a recoger su pedido
            </Text>

            <Button
              style={[globalStyles.boton, { marginTop: 100 }]}
              rounded
              block
              onPress={() => navigation.navigate("menu")}>
              <Text style={globalStyles.botonTexto}>
                Comenzar Una Orden Nueva
              </Text>
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tiempo: {
    marginBottom: 20,
    fontSize: 60,
    textAlign: "center",
    marginTop: 80,
  },
  textoCompletadoLista: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textoCompletadoRecoger: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 14,
    marginBottom: 20,
  },
});

export default ProgresoPedido;
