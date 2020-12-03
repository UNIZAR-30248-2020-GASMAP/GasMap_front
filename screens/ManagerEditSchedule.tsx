import * as React from 'react';
import { useState } from 'react';
import { Alert, Image, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';

import { Text, View } from '../components/Themed';
import { Icon, Button } from 'react-native-elements';

import { servicesListToIcon } from '../models/listServicesToIcon'
import { Picker } from 'react-native';

import { postSchedule } from '../drivers/connection'



export default class ManagerEditSSchedule extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      //idGasolinera: this.props.route.params.datosGasolinera.id_gas,
      newDay: "Mon",
      newOpening: "00:00",
      newClosing: "00:00",
    };
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
          <View style={styles.containerModal}>
            {/*Update day scheduler*/}
            <Text style={styles.plain}>
              Select day
            </Text>
            <Picker
            selectedValue={this.state.newDay}
            style={{ height: 20, width: 150, marginBottom: 22}}
            onValueChange={(itemValue, itemIndex) => this.setDay(itemValue)}
            >
            <Picker.Item label="Monday" value="Mon" />
            <Picker.Item label="Tuesday" value="Tue" />
            <Picker.Item label="Wednesday" value="Wed" />
            <Picker.Item label="Thursday" value="Thu" />
            <Picker.Item label="Friday" value="Fri" />
            <Picker.Item label="Saturday" value="Sat" />
            <Picker.Item label="Sunday" value="Sun" />
            </Picker>

            {/*Update opening scheduler*/}
            <Text style={styles.plain}>
              Select opening time
            </Text>
            <Picker
              selectedValue={this.state.newOpening}
              style={{ height: 20, width: 150, marginBottom: 22}}
              onValueChange={(itemValue, itemIndex) => this.setOpening(itemValue)}
              >
              <Picker.Item label="00:00" value="00:00" /><Picker.Item label="00:30" value="00:30" />
              <Picker.Item label="01:00" value="01:00" /><Picker.Item label="01:30" value="01:30" />
              <Picker.Item label="02:00" value="02:00" /><Picker.Item label="02:30" value="02:30" />
              <Picker.Item label="03:00" value="03:00" /><Picker.Item label="03:30" value="03:30" />
              <Picker.Item label="04:00" value="04:00" /><Picker.Item label="04:30" value="04:30" />
              <Picker.Item label="05:00" value="05:00" /><Picker.Item label="05:30" value="05:30" />
              <Picker.Item label="06:00" value="06:00" /><Picker.Item label="06:30" value="06:30" />
              <Picker.Item label="07:00" value="07:00" /><Picker.Item label="07:30" value="07:30" />
              <Picker.Item label="08:00" value="08:00" /><Picker.Item label="08:30" value="08:30" />
              <Picker.Item label="09:00" value="09:00" /><Picker.Item label="09:30" value="09:30" />
              <Picker.Item label="10:00" value="10:00" /><Picker.Item label="10:30" value="10:30" />
              <Picker.Item label="11:00" value="11:00" /><Picker.Item label="11:30" value="11:30" />
              <Picker.Item label="12:00" value="12:00" /><Picker.Item label="12:30" value="12:30" />
              <Picker.Item label="13:00" value="13:00" /><Picker.Item label="13:30" value="13:30" />
              <Picker.Item label="14:00" value="14:00" /><Picker.Item label="14:30" value="14:30" />
              <Picker.Item label="15:00" value="15:00" /><Picker.Item label="15:30" value="15:30" />
              <Picker.Item label="16:00" value="16:00" /><Picker.Item label="16:30" value="16:30" />
              <Picker.Item label="17:00" value="17:00" /><Picker.Item label="17:30" value="17:30" />
              <Picker.Item label="18:00" value="18:00" /><Picker.Item label="18:30" value="18:30" />
              <Picker.Item label="19:00" value="19:00" /><Picker.Item label="19:30" value="19:30" />
              <Picker.Item label="20:00" value="20:00" /><Picker.Item label="20:30" value="20:30" />
              <Picker.Item label="21:00" value="21:00" /><Picker.Item label="21:30" value="21:30" />
              <Picker.Item label="22:00" value="22:00" /><Picker.Item label="22:30" value="22:30" />
              <Picker.Item label="23:00" value="23:00" /><Picker.Item label="23:30" value="23:30" />
            </Picker>

            {/*Update closing scheduler*/}
            <Text style={styles.plain}>
              Select closing time
            </Text>
            <Picker
              selectedValue={this.state.newClosing}
              style={{ height: 20, width: 150, marginBottom: 22}}
              onValueChange={(itemValue, itemIndex) => this.setClosing(itemValue)}
              >
              <Picker.Item label="00:00" value="00:00" /><Picker.Item label="00:30" value="00:30" />
              <Picker.Item label="01:00" value="01:00" /><Picker.Item label="01:30" value="01:30" />
              <Picker.Item label="02:00" value="02:00" /><Picker.Item label="02:30" value="02:30" />
              <Picker.Item label="03:00" value="03:00" /><Picker.Item label="03:30" value="03:30" />
              <Picker.Item label="04:00" value="04:00" /><Picker.Item label="04:30" value="04:30" />
              <Picker.Item label="05:00" value="05:00" /><Picker.Item label="05:30" value="05:30" />
              <Picker.Item label="06:00" value="06:00" /><Picker.Item label="06:30" value="06:30" />
              <Picker.Item label="07:00" value="07:00" /><Picker.Item label="07:30" value="07:30" />
              <Picker.Item label="08:00" value="08:00" /><Picker.Item label="08:30" value="08:30" />
              <Picker.Item label="09:00" value="09:00" /><Picker.Item label="09:30" value="09:30" />
              <Picker.Item label="10:00" value="10:00" /><Picker.Item label="10:30" value="10:30" />
              <Picker.Item label="11:00" value="11:00" /><Picker.Item label="11:30" value="11:30" />
              <Picker.Item label="12:00" value="12:00" /><Picker.Item label="12:30" value="12:30" />
              <Picker.Item label="13:00" value="13:00" /><Picker.Item label="13:30" value="13:30" />
              <Picker.Item label="14:00" value="14:00" /><Picker.Item label="14:30" value="14:30" />
              <Picker.Item label="15:00" value="15:00" /><Picker.Item label="15:30" value="15:30" />
              <Picker.Item label="16:00" value="16:00" /><Picker.Item label="16:30" value="16:30" />
              <Picker.Item label="17:00" value="17:00" /><Picker.Item label="17:30" value="17:30" />
              <Picker.Item label="18:00" value="18:00" /><Picker.Item label="18:30" value="18:30" />
              <Picker.Item label="19:00" value="19:00" /><Picker.Item label="19:30" value="19:30" />
              <Picker.Item label="20:00" value="20:00" /><Picker.Item label="20:30" value="20:30" />
              <Picker.Item label="21:00" value="21:00" /><Picker.Item label="21:30" value="21:30" />
              <Picker.Item label="22:00" value="22:00" /><Picker.Item label="22:30" value="22:30" />
              <Picker.Item label="23:00" value="23:00" /><Picker.Item label="23:30" value="23:30" />
            </Picker>
            <View style={styles.containerButtons}>
            <Button
                containerStyle={styles.button}
                title="Save"
                onPress={() => {
                  // const replacedTime = "Mon: 08:00-23:00\\nTue: 07:00-23:00\\nWed: 08:00-23:00\\nThu: 09:00-23:00\\nFri: 10:00-23:00\\nSat: 06:00-00:00\\nSun: 06:00-00:00\\n"
                  const replacedTime = this.replaceTime(this.props.route.params.datosGasolinera.time_gas, 
                    this.state.newDay, this.state.newOpening, this.state.newClosing)
                  this.saveSchedule(replacedTime)
                }}
              />
              <Text>{"\t"}</Text>
              <Button
                containerStyle={styles.button}
                title="Cancel"
                onPress={() => {
                  Alert.alert("volver a la pantalla anterior")
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  setDay = (day: any) => {
    this.setState({
      newDay: day
    })
  }
  
  setOpening = (time: any) => {
    this.setState({
      newOpening: time
    })
  }

  setClosing = (time: any) => {
    this.setState({
      newClosing: time
    })
  }
  
  
  replaceTime = (oldSchedule: string, day: string, opening: string, closing: string) => {
    const exp = new RegExp(day + ": \\d\\d:\\d\\d\-\\d\\d:\\d\\d")
    const newSchedule = oldSchedule.replace(exp, day + ": " + opening + "-" + closing)
    return newSchedule
  }

  async saveSchedule(replacedTime: string) {
    await postSchedule(this.props.route.params.datosGasolinera.id_gas, 
      replacedTime)
      .then(data => {
      if (data == undefined) {
        Alert.alert('Connection error');
      } else {
        Alert.alert('New schedule updated');
        this.setState({ datosGasolinera: { ...this.props.route.params.datosGasolinera, time_gas: replacedTime } });
        this.props.navigation.navigate("ManagerGasStation", {datosGasolinera: { ...this.props.route.params.datosGasolinera, time_gas: replacedTime}});
      }
    })
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
    fontWeight: 'bold',
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
  },
  containerButtons:{
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: "yellow",
    alignSelf: "center",
    width: "40%",
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 50
  },
  containerModal:{
    marginTop: 22,
    alignItems: "center",
    backgroundColor: 'transparent',
  },
});
