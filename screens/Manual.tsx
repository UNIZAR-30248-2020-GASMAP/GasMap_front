import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';


export default class Manual extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle}>User Manual</Text>
        <Text style={styles.title}>Main Screen</Text>
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

        <Text style={styles.title}>Gas station</Text>
        <Text style={styles.plain}>This screen shows all of the important information
        about the clicked gas station. It also allows the user to update the price of 
        one fuel type if it has not been changed in the last 24 hours and if it does not variate
        more than 5% of the last price. There is also a report button for the user to report
        anything that looks wrong.
        </Text>
        <Text style={styles.plain}>On this screen is also shown a graph with the last 5
        prices that a fuel type has.
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
