import * as React from 'react';
import MapView from 'react-native-maps';
import { Alert, StyleSheet, Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Icon, Button } from 'react-native-elements';






export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One - Main Screen</Text> */}
      <View style={styles.map_section}>
        <Text>Here goes the map</Text>
        <MapView style={styles.mapStyle}/>
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
              onPress={() => console.log('hello')} />
          </View>

          <View style={styles.icon_container}>
            <Icon
              raised
              // containerStyle={{backgroundColor: 'red'}}
              // iconStyle={{backgroundColor: 'red'}}
              name='location-searching'
              type='material'
              color='black'
              // iconStyle={{}}
              size={30}
              onPress={() => console.log('hello')} />
          </View>
        </View>
        {/* <View style={styles.button_container}> */}

        <Button
          // color="red"
          containerStyle={styles.button}
          // buttonStyle={{ backgroundColor: "red"}}
          title="Remove filters"
          onPress={() => Alert.alert("Filters remove.")}
        />
        {/* </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map_section: {
    flex: 7,
    // marginVertical: 30,
    backgroundColor: "green",
    width: "100%",
    color: "black",
    // marginHorizontal: 30,
  },
  info_section: {
    flex: 2,
    marginVertical: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 3,
  },

  icon_main_container: {
    // flex: 1,
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "yellow",
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
});
