import * as React from 'react';
import { useState } from 'react';
import { Alert, Image, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';

import { Text, View } from '../components/Themed';
import { Icon } from 'react-native-elements';

import { servicesListToIcon } from '../models/listServicesToIcon'



export default class ManagerEditSSchedule extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
     
    };
  }

  async componentDidMount() {
    
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
            </Text>
            {/* Horizontal line */}
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View style={styles.containerDay}>
            <Text style={styles.plainBold}>
              Services Scheduler
            </Text>
          </View>
        </View>
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
  containerDay: {
    alignItems: 'flex-start',
    backgroundColor: 'yellow'
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
