/** @format */

import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UserInfo from "../components/Account/UserInfo";
import MenuAccount from "../components/Account/MenuAccount";
// import ScreenLoading from "../../components/ScreenLoading";
import StatusBarCustom from "../components/StatusBar";
import colors from "../styles/colors";

export default function Account() {
  return (
    <>
      <StatusBarCustom
        backgroundColor={colors.bgDark}
        barStyle='light-content'
      />

      <ScrollView>
        <UserInfo />

        <MenuAccount />
      </ScrollView>
    </>
  );
}
