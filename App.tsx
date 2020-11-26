// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import 'react-native-gesture-handler';

import * as React from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from './screens/MainScreen';
import Manual from './screens/Manual';
import GasStation from './screens/GasStation';
import ManagerLogin from './screens/ManagerLogin';
import ManagerEditServices from './screens/ManagerEditServices';
import ManagerGasStation from './screens/ManagerGasStation';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row'}}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={require('./assets/images/drawerWhite.png')}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const ProfileDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleLogin = () => {
    //Props to open/close the drawer
    props.navigationProps.navigate('ManagerLogin');
  };

  return (
    <View>
      <TouchableOpacity onPress={()=> toggleLogin()}>
        <Image
          source={require('./assets/images/profile_icon.png')}
          style={{
            width: 25,
            height: 25,
            marginRight: 8
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const BackDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleBack = () => {
    //Props to open/close the drawer
    props.navigationProps.navigate('MainScreen');
  };

  return (
    <View>
      <TouchableOpacity onPress={()=> toggleBack()}>
        <Image
          source={require('./assets/images/back.png')}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

function mainScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="MainScreen"
        screenOptions={{
          headerLeft: ()=>
            <NavigationDrawerStructure
              navigationProps={navigation}
            />,
          headerRight: ()=>
            <ProfileDrawerStructure
              navigationProps={navigation}
            />,
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          }
        }}
      >
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            title: 'MainScreen', //Set Header Title
          }}
        />
        <Stack.Screen
          name="GasStation"
          component={GasStation}
          options={{
            title: 'GasStation', //Set Header Title
            headerLeft: ()=>
            <BackDrawerStructure
              navigationProps={navigation}
            />,
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          }
          }}
        />
      </Stack.Navigator>
  );
}

function manualScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Manual"
      screenOptions={{
        headerLeft: ()=>
          <NavigationDrawerStructure
            navigationProps={navigation}
          />,
        headerRight: ()=>
          <ProfileDrawerStructure
            navigationProps={navigation}
          />,
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="Manual"
        component={Manual}
        options={{
          title: 'Manual', //Set Header Title
        }}/>
    </Stack.Navigator>
  );
}

/*function gasStationScreenStack({ navigation, route }) {
  return (
    <Stack.Navigator
      initialRouteName="GasStation"
      screenOptions={{
        headerLeft: ()=>
          <BackDrawerStructure
            navigationProps={navigation}
          />,
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="GasStation"
        component={GasStation}
        options={{
          title: 'GasStation', //Set Header Title
        }}/>
    </Stack.Navigator>
  );
}*/

function managerLoginScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ManagerLogin"
      screenOptions={{
        headerLeft: ()=>
          <BackDrawerStructure
            navigationProps={navigation}
          />,
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="ManagerLogin"
        component={ManagerLogin}
        options={{
          title: 'ManagerLogin', //Set Header Title
        }}/>
      <Stack.Screen
        name="ManagerGasStation"
        component={ManagerGasStation}
        options={{
          title: 'ManagerGasStation', //Set Header Title
        }}/>
        <Drawer.Screen
          name="ManagerEditServices"
          options={{ drawerLabel: 'Manager Edit Services (in process)' }}
          component={ManagerEditServices}/>
    </Stack.Navigator>
  );
}


// function managerEditServicesScreenStack({ navigation }) {
//   return (
//     <Stack.Navigator
//       initialRouteName="ManagerEditServices"
//       screenOptions={{
//         headerLeft: ()=>
//           <BackDrawerStructure
//             navigationProps={navigation}
//           />,
//         headerStyle: {
//           backgroundColor: '#f4511e', //Set Header color
//         },
//         headerTintColor: '#fff', //Set Header text color
//         headerTitleStyle: {
//           fontWeight: 'bold', //Set Header text style
//         }
//       }}>
//       <Stack.Screen
//         name="ManagerEditServices"
//         component={ManagerEditServices}
//         options={{
//           title: 'ManagerEditServices', //Set Header Title
          
//         }}/>
//     </Stack.Navigator>
//   );
// }



function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}>
        <Drawer.Screen
          name="Main Screen"
          options={{ drawerLabel: 'Main Screen' }}
          component={mainScreenStack}/>
        <Drawer.Screen
          name="ManualPage"
          options={{ drawerLabel: 'Manual' }}
          component={manualScreenStack} />
        <Drawer.Screen
          name="ManagerLogin"
          options={{ drawerLabel: 'Manager Login' }}
          component={managerLoginScreenStack}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;