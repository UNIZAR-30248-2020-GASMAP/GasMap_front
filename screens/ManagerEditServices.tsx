import * as React from 'react';
import { useState } from 'react';
import { Alert, Image, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Icon } from 'react-native-elements';

import { updateGasServices } from '../drivers/connection';
import { ListItem, Avatar } from 'react-native-elements'

import { servicesListToIcon } from '../models/listServicesToIcon'
import { color } from 'react-native-reanimated';




export default class ManagerEditServices extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      idGasolinera: '',
      datosGasolinera: [],
      newServices: [], //array to modify services
    };
  }

  async componentDidMount() {
    this.setState({
      idGasolinera: this.props.route.params.datosGasolinera.id_gas,
      datosGasolinera: this.props.route.params.datosGasolinera,
      newServices: this.props.route.params.datosGasolinera.services_gas,
      // switchValue: switchValue,
      // setSwitchValue: setSwitchValue
    })
    console.log("STATE")
    console.log(this.state);
    console.log(this.props);
  }

  toggleSwitch1 = (service_name) => {
    console.log(!this.state.switch1Value)
    //Actual value
    let value = this.state.newServices.includes(service_name)
    // new value
    let newValue = !value
    // //Hacer push o delete del array de serviios en funcion del value
    console.log("newVALUE: " + newValue);
    if(newValue){
    //   //If true add to array list, as default is a true, when click it first removes, so wont duplicate
    //   //add service
    console.log("arrayAux")
    console.log(this.state.newServices.concat(service_name))
      this.setState({ newServices: [...this.state.newServices, service_name] }) 
    //   console.log(this.state);
    }else{
    //   //If false, delete from array list
      let arrayAux = this.state.newServices.filter(item => item !== service_name)
      console.log("arrayAux")
      console.log(arrayAux)
      this.setState({ newServices: arrayAux }) 
    //   console.log(this.state);
    }
    //Change at end to not have problems
    this.setState({switch1Value: !this.state.switch1Value})
 }

  


  showServices = () => {
    console.log("Show services EDIT");
    console.log(JSON.stringify(this.state.datosGasolinera.services_gas));
    console.log("Show services edit");
    let listServices = this.state.datosGasolinera.services_gas;
    if (listServices !== undefined) {
      let services = JSON.parse(servicesListToIcon);
      return (
        listServices.map((service_name: any, l: any) => (
          
          <View style={[styles.servicesViewRow]}>
              <Icon
                reverse
                style={styles.servicesIcon}
                name={services[service_name]}
                type='font-awesome'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service:' + service_name)}
              />
              <Text style={styles.textRow}
              >{service_name}</Text>
              <Switch
                style={{alignSelf: 'center'}}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor="#f5dd4b"
                ios_backgroundColor="#3e3e3e"
                thumbColor='orange'
                onValueChange={() => {this.toggleSwitch1(service_name)}}
                value={
                    //return true if service_name is in array
                    this.state.newServices.includes(service_name)
                } 
              />

          </View>
        ))
      )
    } else {
      return (
        <Text style={{ color: 'black' }}>Indefinido</Text>
      )
    }
  }


  updateGasServices = async () => {
    Alert.alert('En update');
    //In newServices we havee the new services, update the array
    this.setState({datosGasolinera: {...this.state.datosGasolinera, services_gas: this.state.newServices}});
    console.log("this.state.datosGasolinera");
    console.log(this.state.datosGasolinera);
    await updateGasServices(this.state.datosGasolinera.id_gas, this.state.newServices).then(data => {
      console.log("DATA UPDATE")
      console.log(data)
      if (data == undefined) {
        Alert.alert('Not update');
        this.props.navigation.navigate("ManagerGasStation");
      } else {
        Alert.alert('Update OK');
        this.props.navigation.navigate("ManagerGasStation");
      }
    })
  }

  render() {
    console.log("RENDER");
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerTop}>
            <Text style={styles.mainTitle}>Your Gas Station is:</Text>
            <Text style={styles.plainBold}>
              <Icon
                name='location-on'
                type='material'
                color='black'
                size={30}
                onPress={() => console.log('hello')}
              />
              {this.state.datosGasolinera.street_gas}
            </Text>
            {/* Horizontal line */}
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={styles.containerServices}>
            <Text style={styles.plainBold}>
              {'Services'}
            </Text>
            <View style={styles.servicesView}>
              {this.showServices()}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => this.updateGasServices()}>
          <Text style={styles.loginText}>Update services</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  containerTop: {
    alignItems: 'center',
    paddingBottom: '1%',
    backgroundColor: 'white'
  },
  containerServices: {
    alignItems: 'flex-start',
    backgroundColor: 'yellow'
  },
  containerListServices: {
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  servicesView: {
    paddingTop: '2.5%',
    backgroundColor: 'white',
    width: '100%',
  },
  servicesViewRow: {
    paddingTop: '2.5%',
    backgroundColor: 'white',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    color: 'black',
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: '5%',
    paddingBottom: '1%',
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: '0%',
    color: 'black',
  },
  textRow:{
    color: 'black',
    fontSize: 25,
    alignSelf:'center', 
    paddingTop: 10
  },
  plain: {
    fontSize: 17,
    color: 'black',
  },
  plainBold: {
    fontSize: 23,
    color: 'black',
    fontWeight: "900",
    paddingBottom: '5%',
    paddingTop: '5%',
    paddingLeft: '5%'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});
