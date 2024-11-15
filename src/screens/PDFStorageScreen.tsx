import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PDFStorageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aquí se mostrarán los PDFs creados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
