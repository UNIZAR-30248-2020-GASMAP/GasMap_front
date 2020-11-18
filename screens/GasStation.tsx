import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


export default class TabTwoScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Manual de usuario</Text>
        <Text style={styles.title}>Vista Principal</Text>
        <Text style={styles.plain}>La vista principal de la pantalla corresponde
          a un mapa en el que se muestras algunas gasolineras mediante el icono 
          de un surtidor de gasolina como el siguiente.
          <Image source={require('../assets/images/gas-station-icon.png')}/>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'baseline',
    backgroundColor: 'white'
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
    fontSize: 20,
    color: 'black',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
