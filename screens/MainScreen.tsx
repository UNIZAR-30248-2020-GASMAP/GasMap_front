import React, { useState, useEffect, Component } from 'react';

import { Text, Image, Modal, Picker } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import { View } from '../components/Themed';
import { Icon, Button } from 'react-native-elements';

import { getGasStations, getStationByMaxDistance } from '../drivers/connection'





//Main class with all the main screen handlers to display the information
export default class MainScreen extends React.Component{

  constructor(props: any) {
    super(props)
    this.state = {
      gasStations: [],
      modalDistanceVisible: false,
      distanceFilter: "50",
      lat: 41.656064,
      lon: -0.879280,
    };
  }

  //Get the position of the user and request the gas stations in a range of 'distance' km
  filterByDistance(distance: number){
    Location.getLastKnownPositionAsync({maxAge: 10000, requiredAccuracy: 50})
    .then( res => {
      const coords = {
        lat: res?.coords.latitude, 
        lon: res?.coords.longitude 
      }
      //TODO: display this gas stations
      getStationByMaxDistance(coords, distance).then( stations => {
        this.setGasStations(stations)
        return stations
      })
    }).catch( _err => {
      Alert.alert("Connection error")
      return null
    })
  }

  //Alternate the modalDistanceVisible value
  changeDistanceModalState =() =>{
    this.setState({
      modalDistanceVisible: !this.state.modalDistanceVisible
    })
  }

  setDistanceFilter = (distance) => {
    this.setState({
      distanceFilter: distance
    })
  }

  setGasStations = (stations) =>{
    if (stations != null) {
      console.log("setStations")
      console.log(stations)
      this.setState({ gasStations: stations })  
    } else {
      console.log("cannot set gas stations because value is null")
    }
  }
  
  async componentDidMount() {
    Location.getLastKnownPositionAsync({maxAge: 10000, requiredAccuracy: 50})
    .then( res => {
      const coords = {
        lat: res?.coords.latitude, 
        lon: res?.coords.longitude 
      }
      this.setState({lat: res?.coords.latitude,
                     lon: res?.coords.longitude})
      getGasStations(coords).then(data => {
        this.setState({ gasStations: data })
      })
    }).catch( _err => {
        console.log("Location error")
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
              latitude: this.state.lat,
              longitude: this.state.lon,
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
                    () => {
                      this.props.navigation.setParams({
                        idGasolinera: station.id_gas
                      });
                      console.log(this.props.navigation);
                      // <GasStation idGasolinera={station.id_gas}/>
                      this.props.navigation.navigate("GasStation", { idGasolinera: station.id_gas })
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
                onPress={() => this.changeDistanceModalState()} />
            </View>
            <View style={styles.containerTop}>
            
            {/*Shows the popup to filter by distance */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalDistanceVisible}
              onRequestClose={() => {
                this.changeDistanceModalState()
              }}>
                <View style={styles.containerModal}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Select the maximum distance in Km</Text>
                    <Picker
                      selectedValue={this.state.distanceFilter}
                      style={{ height: 200, width: 200}}
                      onValueChange={(itemValue, itemIndex) => this.setDistanceFilter(itemValue)}
                    >
                      <Picker.Item label="5" value="5" />
                      <Picker.Item label="25" value="25" />
                      <Picker.Item label="50" value="50" />
                      <Picker.Item label="100" value="100" />
                    </Picker>

                    <View style={styles.containerButtons}>
                      <Button
                        containerStyle={styles.button}
                        title="Save"
                        onPress={() => {
                          this.changeDistanceModalState();
                          this.filterByDistance(this.state.distanceFilter);
                        }}
                      />
                      <Text>{"\t"}</Text>
                      <Button
                        containerStyle={styles.button}
                        title="Cancel"
                        onPress={() => {
                          this.changeDistanceModalState();
                        }}
                      />
                    </View>
                  </View>
                </View>
            </Modal>
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
                onPress={() => 
                  Location.getLastKnownPositionAsync({maxAge: 10000, requiredAccuracy: 50})
                  .then( res => {
                    const coords = {
                      lat: res?.coords.latitude, 
                      lon: res?.coords.longitude 
                    }
                    this.setState({lat: res?.coords.latitude,
                                  lon: res?.coords.longitude})
                  }).catch( _err => {
                      console.log("Location error")
                })} />
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
    width: "50%",
    borderRadius: 5,
    marginTop: 10,
  },

  mapStyle: {
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    color:'black'
  },
  containerModal:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
    marginTop: 22
  },
  containerButtons:{
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerTop: {
    alignItems: 'center',
    paddingBottom: '5%',
    backgroundColor: 'white'
  },
});
