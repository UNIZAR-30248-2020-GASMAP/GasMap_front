import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './screens/MainScreen';
import Screen2 from './screens/TabTwoScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MainScreen">
        <Drawer.Screen name="MainScreen" component={MainScreen} />
        <Drawer.Screen name="Screen2" component={Screen2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}