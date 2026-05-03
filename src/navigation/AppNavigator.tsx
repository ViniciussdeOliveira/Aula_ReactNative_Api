import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SimpleScreen from '../screens/SimpleScreen';
import AdvancedScreen from '../screens/AdvancedScreen';

// Tipagem das rotas
export type RootTabParamList = {
  Simple: undefined;
  Advanced: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'help';

            if (route.name === 'Simple') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'Advanced') {
              iconName = focused ? 'layers' : 'layers-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e3350d',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60 + insets.bottom,
          },
        })}
      >
        <Tab.Screen 
          name="Simple" 
          component={SimpleScreen} 
          options={{ tabBarLabel: 'Monolítico' }} 
        />
        <Tab.Screen 
          name="Advanced" 
          component={AdvancedScreen} 
          options={{ tabBarLabel: 'Estruturado' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}