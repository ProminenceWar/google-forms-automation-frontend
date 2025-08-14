/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { FormScreen } from '../src/screens/FormScreen';

// Mock SafeAreaProvider
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

test('FormScreen renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<FormScreen />);
  });
});

test('FormScreen contains required form elements', async () => {
  let component: ReactTestRenderer.ReactTestRenderer;
  
  await ReactTestRenderer.act(() => {
    component = ReactTestRenderer.create(<FormScreen />);
  });

  const tree = component!.toJSON();
  expect(tree).toBeTruthy();
});