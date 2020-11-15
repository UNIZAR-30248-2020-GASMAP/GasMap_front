import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './screens/MainScreen';
import TabTwoScreen from './screens/TabTwoScreen';
import ManagerLogin from './screens/ManagerLogin';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MainScreen">
        <Drawer.Screen name="MainScreen" component={MainScreen} />
        <Drawer.Screen name="TabTwoScreen" component={TabTwoScreen} />
        <Drawer.Screen name="Manager Login" component={ManagerLogin} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}