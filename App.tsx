/**
 * Google Forms Automation Frontend
 * React Native App for form automation
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FormScreen } from './src/screens/FormScreen';
import { Colors } from './src/utils/constants';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={Colors.background}
        translucent={false}
      />
      <FormScreen />
    </SafeAreaProvider>
  );
}

export default App;
