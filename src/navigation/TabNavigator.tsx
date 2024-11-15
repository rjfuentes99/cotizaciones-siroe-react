import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PDFCreationScreen from '../screens/PDFCreationScreen';
import PDFStorageScreen from '../screens/PDFStorageScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
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
