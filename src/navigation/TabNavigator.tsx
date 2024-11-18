import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import PDFCreationScreen from '../screens/PDFCreationScreen';
import PDFStorageScreen from '../screens/PDFStorageScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [loading, setLoading] = useState(true);

  // Simula un tiempo de carga para inicializar el componente (puedes conectarlo con lógica real)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simula 2 segundos de carga
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            if (route.name === 'Formulario') {
              iconName = 'document-text-outline';
            } else if (route.name === 'Almacenamiento') {
              iconName = 'folder-outline';
            }

            return <Ionicons name={iconName!} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Formulario" component={PDFCreationScreen} />
        <Tab.Screen name="Almacenamiento" component={PDFStorageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
