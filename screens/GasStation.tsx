import * as React from 'react';
import { Alert, Image, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Icon } from 'react-native-elements';

import { getGasStationsById } from '../drivers/connection'


export default class TabTwoScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      idGasolinera:2,
      datosGasolinera:[]
    };
  }
  async componentDidMount(){
    //Poner un Toast Loading mientras se realiza esta llamada para informar al usuario que se está cargando
    //Llamar a la función del back para ver los datos de la gasolinera que se quiere
    console.log("Voy a llamar a la funcion del back para obtener los datos de la gasolinera a partir del ID")
    await getGasStationsById(this.state.idGasolinera).then(data => {
      console.log("DATOS GASOLINERA A PARTIR DEL ID")
      console.log(data)
      this.setState({ datosGasolinera: data })
    })

  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text style={styles.mainTitle}>Gas Station Info</Text>
          <Text style={styles.plain}>
            <Icon
              name='location-on'
              type='material'
              color='black'
              size={30}
              onPress={() => console.log('hello')}
            />
            {this.state.datosGasolinera.street_gas}       
          </Text>
        </View>
        <View style={styles.containerServices}>
          <Text style={styles.plainBold}>
            {'Services: '}
          </Text>
          <View style={styles.servicesView}>
            <Icon
              reverse 
              style={styles.servicesIcon}
              name='wheelchair'
              type='font-awesome'
              color='black'
              size={15}
              onPress={() => Alert.alert('Service: Wheelchair')}
            />
            <Icon
              reverse 
              style={styles.servicesIcon}
              name='cc-mastercard'
              type='font-awesome'
              color='black'
              size={15}
              onPress={() => Alert.alert('Service: Credit Card available')}
            />
            <Icon
              reverse 
              style={styles.servicesIcon}
              name='wind'
              type='font-awesome-5'
              color='black'
              size={15}
              onPress={() => Alert.alert('Service: Air pump')}
            />
            <Icon
              reverse 
              style={styles.servicesIcon}
              name='water'
              type='font-awesome-5'
              color='black'
              size={15}
              onPress={() => Alert.alert('Service: Water hose')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  containerTop:{
    alignItems: 'center',
    paddingBottom: '5%',
    backgroundColor: 'white'
  },
  containerServices:{
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: '15%',
    paddingBottom: '10%',
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: '5%',
    color: 'black',
  },
  plain: {
    fontSize: 23,
    color: 'black',
  },
  plainBold: {
    fontSize: 23,
    color: 'black',
    fontWeight:"900",
    paddingBottom: '5%',
    paddingTop: '5%',
    paddingLeft: '5%'
  },
  servicesIcon: {

  },
  servicesView: {
    paddingTop: '2,5%',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
