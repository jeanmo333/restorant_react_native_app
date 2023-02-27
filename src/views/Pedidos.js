/** @format */

import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Pedidos extends Component {
  render() {
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontWeight: "bold",
            fontSize: 20,
          }}>
          {" "}
          mis pedidos{" "}
        </Text>
      </View>
    );
  }
}
