import React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { View, Text } from 'react-native';

// Este es un ejemplo de cómo usar un componente de UI Kitten
const App = () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, UI Kitten!</Text>
    </View>
  </ApplicationProvider>
);

export default App;
