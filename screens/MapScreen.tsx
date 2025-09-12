import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// หน้าโล่งๆ
const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>หน้าแผนที่ (ยังว่าง) 🗺️</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { fontSize:24 }
});

export default MapScreen;
