import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';


export default class TabTwoScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle}>Manual de usuario</Text>
        <Text style={styles.title}>Vista Principal</Text>
        <Text style={styles.plain}>The main screen shows a map where some gas
          stations are displayed with a petrol pump icon like this one.
          <Image source={require('../assets/images/gas-station-icon.png')}/>
        </Text>

        <Text style={styles.title}>Manager Login</Text>
        <Text style={styles.plain}>A manager need a valid account that will be
          validated through a form, wich requires an email and password.
          The email needs a valid format and the password has to be 12 characters
          minimum.
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
