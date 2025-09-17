import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../asset/Pai-D_logo.jpg")} // โลโก้
        style={styles.logo}
      />
      {/* <Text style={styles.text}>Loading...</Text> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24244b",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 400,
    height: 400,
    // marginBottom: 20,
    resizeMode: "contain",
  },
  text: {
  fontSize: 40,
  color: "white",
  fontWeight: "bold",
  alignSelf: "flex-start", 
  marginLeft: 128, // ขยับจากขอบซ้าย 40px
},
});
