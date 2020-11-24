import React, { useState, useEffect } from 'react';
import { Text, Image, Platform } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, StyleSheet, Dimensions } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { Icon, Button } from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';

function welcomeMessage() {
  Alert.alert(
    'MENSAJE DE PRUEBA',
    'otro mensaje',
    [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Ok'
      }
    ]
  )
}

export default function TabOneScreen() {

  
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      alert('Location: ' + JSON.stringify(location));
      setLocation(location);
    })();
  }, []);
  
  return (
    
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One - Main Screen</Text> */}
      <View style={styles.map_section}>
        <MapView style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          region={{ 
            latitude: 41.653915,
            longitude: -0.884258,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035}}>
        
          <Marker
            coordinate={{
              latitude: 41.683889,
              longitude: -0.887348}}
              onPress={welcomeMessage}>
            
            
            <Image source={require('../assets/images/gas-station-icon.png')}/>

          </Marker>
            
        </MapView>
      </View>
      <View style={styles.info_section}>
        <View style={styles.icon_main_container}>
          <View style={styles.icon_container}>
            <Icon
              raised
              name='map-o'
              type='font-awesome'
              color='black'
              size={30}
              onPress={() => console.log('hello')} />
          </View>

          <View style={styles.icon_container}>
            <Icon
              raised
              name='line-chart'
              type='font-awesome'
              color='black'
              size={30}
              onPress={() => console.log('hello')} />
          </View>

          <View style={styles.icon_container}>
            <Icon
              raised
              name='thumbs-o-up'
              type='font-awesome'
              color='black'
              size={30}
              onPress={() => console.log('hello3')} />
          </View>

          <View style={styles.icon_container}>
            <Icon
              raised
              // containerStyle={{backgroundColor: 'red'}}
              // iconStyle={{backgroundColor: 'red'}}
              name='location-searching'
              type='material'
              color='black'
              // iconStyle={{}}
              size={30}
              onPress={() => console.log('hello2')} />
          </View>
        </View>
        {/* <View style={styles.button_container}> */}

        <Button
          // color="red"
          containerStyle={styles.button}
          // buttonStyle={{ backgroundColor: "red"}}
          title="Remove filters"
          onPress={() => Alert.alert("Filters remove.")}
        />
        {/* </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map_section: {
    flex: 7,
    // marginVertical: 30,
    backgroundColor: "green",
    width: "100%",
    color: "black",
    // marginHorizontal: 30,
  },
  info_section: {
    flex: 2,
    marginVertical: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 3,
  },

  icon_main_container: {
    // flex: 1,
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "yellow",
  },

  icon_container: {
    width: "25%",
    color: "black",
    backgroundColor: "white",
    alignItems: "center",
  },

  button: {
    backgroundColor: "yellow",
    alignSelf: "center",
    width: "80%",
    borderRadius: 5,
    marginTop: 10,
  },

  mapStyle: {
    height: 500,
  }

  
});
