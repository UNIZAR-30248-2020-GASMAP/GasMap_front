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
      idGasolinera: '',
      datosGasolinera: [],
      services: []
    };
  }
  async componentDidMount() {
    this.setState({
      idGasolinera: this.props.route.params.datosGasolinera.id_gas,
      datosGasolinera: this.props.route.params.datosGasolinera
    })
    console.log("STATE")
    console.log(this.state);
    console.log(this.props);


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
  containerListServices: {
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
