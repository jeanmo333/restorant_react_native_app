/** @format */

import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Divider, Button } from "react-native-paper";
import ScreenLoading from "../components/ScreenLoading";
import { useNavigation } from "@react-navigation/native";
// import globalStyles from '../styles/global';

import FirebaseContext from "../context/firebase/firebaseContext";
import PedidoContext from "../context/pedidos/pedidosContext";

import colors from "../styles/colors";
import format from "../utils/format";
import StatusBarCustom from "../components/StatusBar";
const Menu = () => {
  // Context de Firebase
  const { menu, obtenerProductos, loading } = useContext(FirebaseContext);

  // Context de pedido
  const { seleccionarPlatillo } = useContext(PedidoContext);

  // Hook para redireccionar
  const navigation = useNavigation();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const mostrarHeading = (categoria, i) => {
    if (i > 0) {
      const categoriaAnterior = menu[i - 1].categoria;
      if (categoriaAnterior !== categoria) {
        return (
          <>
            <View style={styles.separador}>
              <Text style={styles.separadorTexto}> {categoria} </Text>
            </View>
          </>
        );
      }
    } else {
      return (
        <>
          <View style={styles.separador}>
            <Text style={styles.separadorTexto}> {categoria} </Text>
          </View>
        </>
      );
    }
  };

  if (loading) return <ScreenLoading size='large' />;

  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle='light-content'
      />

      <ScrollView>
        <Text style={styles.textMenu}>Nuestro Menu</Text>

        {menu.map((platillo, i) => {
          const { imagen, nombre, descripcion, categoria, precio, id } =
            platillo;
          return (
            <View key={id}>
              {mostrarHeading(categoria, i)}

              <TouchableWithoutFeedback
                onPress={() => {
                  // Eliminar algunas propiedades del platillo
                  const { existencia, ...platilloNuevo } = platillo;

                  seleccionarPlatillo(platilloNuevo);
                  navigation.navigate("DetallePlatillo");
                }}>
                <View style={styles.container}>
                  <View style={styles.containerImage}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${imagen}`,
                      }}
                    />
                  </View>
                  <View style={styles.info}>
                    <Text
                      style={styles.name}
                      numberOfLines={1}
                      ellipsizeMode='tail'>
                      {nombre}
                    </Text>
                    <Text
                      style={styles.description}
                      numberOfLines={3}
                      ellipsizeMode='tail'>
                      {descripcion}
                    </Text>

                    <Text style={styles.price}>{format(precio)}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  textMenu: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  divider: {
    padding: 2,
    backgroundColor: colors.primary,
  },
  containerImage: {
    width: "35%",
    height: 120,
    paddingHorizontal: 10,
  },
  image: {
    height: 120,
    borderRadius: 10,
  },
  info: {
    width: "65%",
    justifyContent: "center",
    paddingRight: 15,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    textAlign: "justify",
    fontSize: 15,
    color: "grey",
    marginBottom: 5,
    fontSize: 15,
  },

  containerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  separador: {
    backgroundColor: colors.primary,
    marginHorizontal: 10,
  },
  separadorTexto: {
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default Menu;
