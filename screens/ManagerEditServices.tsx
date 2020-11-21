<<<<<<< HEAD
import * as React from 'react';
import { Alert, Image, StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Icon } from 'react-native-elements';

import { getGasStationsById } from '../drivers/connection';
import { Divider } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements'



export default class ManagerEditServices extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      idGasolinera: 1000,
      datosGasolinera: [],
      services: []
    };
  }
  async componentDidMount() {
    //Obetener servicios pasados como parámetro

    //De momento llamamos a backend
    //Poner un Toast Loading mientras se realiza esta llamada para informar al usuario que se está cargando
    //Llamar a la función del back para ver los datos de la gasolinera que se quiere
    console.log("Voy a llamar a la funcion del back para obtener los datos de la gasolinera a partir del ID")
    await getGasStationsById(this.state.idGasolinera).then(data => {
      console.log("ROUTE");
      console.log(this.props.route);
      this.setState({ datosGasolinera: data })
      console.log("DATOS GASOLINERA A PARTIR DEL ID")
      console.log(this.state.datosGasolinera);
    })


  }

  showServices = () => {
    console.log("Show services STRING");
    console.log(JSON.stringify(this.state.datosGasolinera.services_gas));
    console.log("Show services");
    var a = ['Hola1', 'hola2']
    let listServices = this.state.datosGasolinera.services_gas;
    if (listServices !== undefined) {
      return (
        <View style={styles.containerListServices}>
          {
            listServices.map((i, l) => (

              <ListItem key={i} bottomDivider>
                <Avatar source={{ uri: l.avatar_url }} />
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              // <Text style={{color:'black'}} key={gas}>{gas}</Text>
            ))
          }
        </View>
      )

    } else {
      return (
        <Text style={{ color: 'black' }}>Indefinido</Text>
      )
    }
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
          </View>
          {/* Horizontal line */}
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.containerServices}>
            <Text style={styles.plainBold}>
              {'Services'}
            </Text>
            <View style={styles.servicesView}>
              {this.showServices()}
              {/* <Icon
                reverse
                style={styles.servicesIcon}
                name='wheelchair'
                type='font-awesome'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service: Wheelchair')}
              /> */}
              {/* <Icon
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
              /> */}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }


}

// class CustomIcon extends React.Component{


// }

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
    // backgroundColor: 'white',
    alignItems: 'flex-start',
    backgroundColor: 'red'

    // flexDirection: 'row'
  },
  containerListServices:{
    alignItems: 'flex-start',
    backgroundColor: 'red'
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
});
=======
import * as React from 'react';
import { Alert, Image, StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Icon } from 'react-native-elements';

import { getGasStationsById } from '../drivers/connection';
import { Divider } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements'



export default class ManagerEditServices extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      idGasolinera: 1000,
      datosGasolinera: [],
      services: []
    };
  }
  async componentDidMount() {
    //Obetener servicios pasados como parámetro

    //De momento llamamos a backend
    //Poner un Toast Loading mientras se realiza esta llamada para informar al usuario que se está cargando
    //Llamar a la función del back para ver los datos de la gasolinera que se quiere
    console.log("Voy a llamar a la funcion del back para obtener los datos de la gasolinera a partir del ID")
    await getGasStationsById(this.state.idGasolinera).then(data => {
      console.log("ROUTE");
      console.log(this.props.route);
      this.setState({ datosGasolinera: data })
      console.log("DATOS GASOLINERA A PARTIR DEL ID")
      console.log(this.state.datosGasolinera);
    })


  }

  showServices = () => {
    console.log("Show services STRING");
    console.log(JSON.stringify(this.state.datosGasolinera.services_gas));
    console.log("Show services");
    var a = ['Hola1', 'hola2']
    let listServices = this.state.datosGasolinera.services_gas;
    if (listServices !== undefined) {
      return (
        <View style={styles.containerListServices}>
          {
            listServices.map((i, l) => (

              <ListItem key={i} bottomDivider>
                <Avatar source={{ uri: l.avatar_url }} />
                <ListItem.Content>
                  <ListItem.Title>{l.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              // <Text style={{color:'black'}} key={gas}>{gas}</Text>
            ))
          }
        </View>
      )

    } else {
      return (
        <Text style={{ color: 'black' }}>Indefinido</Text>
      )
    }
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
          </View>
          {/* Horizontal line */}
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.containerServices}>
            <Text style={styles.plainBold}>
              {'Services'}
            </Text>
            <View style={styles.servicesView}>
              {this.showServices()}
              {/* <Icon
                reverse
                style={styles.servicesIcon}
                name='wheelchair'
                type='font-awesome'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service: Wheelchair')}
              /> */}
              {/* <Icon
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
              /> */}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }


}

// class CustomIcon extends React.Component{


// }

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
    // backgroundColor: 'white',
    alignItems: 'flex-start',
    backgroundColor: 'red'

    // flexDirection: 'row'
  },
  containerListServices:{
    alignItems: 'flex-start',
    backgroundColor: 'red'
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
});
>>>>>>> 49ce25ba4283d137b62fc1934dba156369fb9103
