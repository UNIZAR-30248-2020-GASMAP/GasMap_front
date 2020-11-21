import React, { useState, useEffect, Component } from 'react';

import { Text, Image, Platform } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';

import { View } from '../components/Themed';
import { Icon, Button } from 'react-native-elements';

import { getGasStations } from '../drivers/connection'
import GasStation from './GasStation';


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
function byeMessage() {
  Alert.alert(
    'CHAU',
    'ADIOOOOOOOOOOOOOS CERDO',
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

//Class that stores all data for a gas station
class gas_station {
    latitude_gas: number = 0;
    longitude_gas: number = 0;
    id: number = 0;

    get_latitude(){
      return this.latitude_gas;
    }
    get_longitude(){
      return this.longitude_gas;
    }
    get_id(){
      return this.id;
    }
}

export default class MainScreen extends Component<{},{gasStations: Array<any>}> {

  constructor(props) {
    super(props)
    this.state = {
      gasStations: [],
    };
  }

  async componentDidMount() {
    const coords = {
      lat: 41.786183, //location?.coords.latitude,
      lon: -1.219913 //location?.coords.longitude
    }
    await getGasStations(coords).then(data => {
      this.setState({ gasStations: data })
      this.newCoords.latitude_gas = data[0].latitude_gas
      this.newCoords.longitude_gas = data[0].longitude_gas
      this.newCoords.id=data[0].id_gas
    })

    {
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log('Location: ' + JSON.stringify(location))
      })();
    }, []);
    }
  }


  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.map_section}>
          <MapView style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            region={{
              latitude: 41.653915,
              longitude: -0.884258,
              latitudeDelta: 0.09,
              longitudeDelta: 0.035
            }}>

            {this.state.gasStations.map((station) => {
                    return (
                      <Marker
                    
                        coordinate={{
                          latitude: station.latitude_gas,
                          longitude: station.longitude_gas,
                        }}
                        onPress={
                          ()=>{this.props.navigation.setParams({
                            idGasolinera: station.id_gas
                          });
                          console.log(this.props.navigation);
                          // <GasStation idGasolinera={station.id_gas}/>
                          this.props.navigation.navigate("GasStation",{  idGasolinera: station.id_gas})
                        }}
                        >


                        <Image source={require('../assets/images/gas-station-icon.png')} />

                      </Marker>
                    );
                  })}
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
                name='location-searching'
                type='material'
                color='black'
                size={30}
                onPress={() => console.log('hello2')} />
            </View>
          </View>

          <Button
            containerStyle={styles.button}
            title="Remove filters"
            onPress={() => Alert.alert("Filters remove.")}
          />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map_section: {
    flex: 7,
    backgroundColor: "green",
    width: "100%",
    color: "black",
  },
  info_section: {
    flex: 2,
    marginVertical: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 3,
  },

  icon_main_container: {
    flexDirection: "row",
    width: "100%",
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
    height: '100%',
  }
});
