import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
} from 'react-native-heroicons/solid';

import { HomeScreen } from '../screens/HomeScreen';
import { FormsStackNavigator } from './FormsStackNavigator';

const Tab = createBottomTabNavigator();

// Componente temporal para probar
const PlaceholderScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Placeholder Screen</Text>
  </View>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: '#95A5A6',
          tabBarIcon: ({ focused, color }) => {
            let IconComponent = HomeIcon;

            switch (route.name) {
              case 'Home':
                IconComponent = HomeIcon;
                break;
              case 'Forms':
                IconComponent = ClipboardDocumentListIcon;
                break;
              case 'Calendar':
                IconComponent = CalendarDaysIcon;
                break;
              case 'Settings':
                IconComponent = Cog6ToothIcon;
                break;
            }

            return <IconComponent size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="Forms"
          component={FormsStackNavigator}
          options={{ tabBarLabel: 'Forms' }}
        />
        <Tab.Screen
          name="Calendar"
          component={PlaceholderScreen}
          options={{ tabBarLabel: 'Calendar' }}
        />
        <Tab.Screen
          name="Settings"
          component={PlaceholderScreen}
          options={{ tabBarLabel: 'Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
