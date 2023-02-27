/** @format */

import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";

export default function UserInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenido : {""}
        <Text style={styles.titleName}>moril jean francois</Text>
      </Text>
      <Text style={styles.title}>
        Tu email es: <Text style={styles.titleName}>moril@gmail.com</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
