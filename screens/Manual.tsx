import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Text, View } from '../components/Themed';


export default class Manual extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.mainTitle}>User Manual</Text>
          <Text style={styles.title}>Main Screen</Text>
          <Text style={styles.plain}>The main screen shows a map where some gas
            stations are displayed with a petrol pump icon like this one.
            <Image source={require('../assets/images/gas-station-icon.png')}/>
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

          <Text style={styles.title}>Filter by distance</Text>
          <Text style={styles.plain}>This filter allows the user to display only the gas stations
          inside a circle range in kilometers from its location.
          </Text>
          <Text style={styles.plain}>
          If GPS is not enabled, nothing will show up.
          </Text>

          <Text style={styles.title}>Filter by service</Text>
          <Text style={styles.plain}>This filter allows the user to display only the gas stations
          that matches with the service requested.
          </Text>
          <Text style={styles.plain}>
          If GPS is not enabled, nothing will show up.
          </Text>


          <Text style={styles.mainTitle}>Manager Manual</Text>

          <Text style={styles.title}>Manager Login</Text>
          <Text style={styles.plain}>A manager need a valid account that will be
            validated through a form, wich requires an email and password.
            The email needs a valid format and the password has to be 12 characters
            minimum.
          </Text>

          <Text style={styles.title}>Manager time schedule edit</Text>
          <Text style={styles.plain}>You can edit the schedule of your gas station by selecting
          the day, the opening and closing time and it will be updated.
          </Text>

          <Text style={styles.title}>Manager fuel price edit</Text>
          <Text style={styles.plain}>You can edit the fuel price of your gas station by selecting
          the fuel and the new price and it will be updated.
          </Text>

          <Text style={styles.title}>Manager services edit</Text>
          <Text style={styles.plain}>You can edit the services of your gas station by selecting
          the switch for every desired service to be added/removed and it will be updated.
          </Text>

          <Text style={styles.title}>Manager add new fuel type</Text>
          <Text style={styles.plain}>You can add a new type of fuel to your gas station by trying to update
          a fuel type, and selecting one that was not already on your gas station, writing 
          the desired price, and it will be updated.
          </Text>
        </View>
      </ScrollView>
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
