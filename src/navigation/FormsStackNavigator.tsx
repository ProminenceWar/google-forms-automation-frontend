import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FormsListScreen } from '../screens/FormsListScreen';
import { FormScreen } from '../screens/FormScreen';

const Stack = createNativeStackNavigator();

export const FormsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FormsList" component={FormsListScreen} />
      <Stack.Screen name="NewForm" component={FormScreen} />
    </Stack.Navigator>
  );
};
