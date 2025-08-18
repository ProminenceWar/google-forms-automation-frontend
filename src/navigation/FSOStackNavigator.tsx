import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FSOScreen } from '../screens/FSOScreen';
import { FSODetailScreen } from '../screens/FSODetailScreen';

export type FSOStackParamList = {
  FSOMain: undefined;
  FSODetail: {
    fsoId: string;
    fsoData: {
      id: string;
      clientName: string;
      orderNumber: string;
      address: string;
      serviceType: string;
      status: 'pending' | 'processing' | 'completed' | 'failed';
      uploadedAt: string;
      processedAt?: string;
      fileName: string;
      fileSize: number;
    };
  };
};

const Stack = createStackNavigator<FSOStackParamList>();

export const FSOStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="FSOMain"
        component={FSOScreen}
        options={{
          title: 'Órdenes de Servicio',
        }}
      />
      <Stack.Screen
        name="FSODetail"
        component={FSODetailScreen}
        options={{
          title: 'Detalle de Orden',
        }}
      />
    </Stack.Navigator>
  );
};
