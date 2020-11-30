import * as React from 'react';
import { useState } from "react";
import { Alert, Image, StyleSheet, ScrollView, Modal, Picker, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View,  } from '../components/Themed';
import { Icon, Button } from 'react-native-elements';

import { getGasStationsById } from '../drivers/connection';
import Table from 'react-native-simple-table';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import { servicesListToIcon } from '../models/listServicesToIcon'



const columnsFuel = [
  {
    title: 'Type',
    dataIndex: 'type',
    width: 105
  },
  {
    title: 'Price/l',
    dataIndex: 'price',
    width: 140
  },
];




var dataTable = []
//Contantes para grafica, updatear al leer de bd
const dataX = [1, 2, 3, 4, 5];
const data = [1.10, 1.12, 1.09,1.05,1.0];
const contentInset = { top: 20, bottom: 20 }

export default class GasStation extends React.Component {


  constructor(props: any) {
    super(props)
    this.state = {
      datosGasolinera: [],
      chart: [1.10, 1.12, 1.9],
      horario : "",
      modalReportVisible: false,
      modalUpdateVisible: false,
      fuel:"",
      price:""
    };
  }

  async componentDidMount() {
    //Poner un Toast Loading mientras se realiza esta llamada para informar al usuario que se está cargando
    //Llamar a la función del back para ver los datos de la gasolinera que se quiere
    console.log("Voy a llamar a la funcion del back para obtener los datos de la gasolinera a partir del ID")
    await getGasStationsById(this.props.route.params.idGasolinera).then(data => {
      this.setState({ datosGasolinera: data })
      console.log(this.state.datosGasolinera)
    })
    this.setState({
      horario: JSON.stringify(this.state.datosGasolinera.time_gas)
      .replace(/\\\\n/g,"\n").replace(/\"/g,"").replace(/ /g, "\t")
      .replace(/Fri:/g,"Fri:  ").replace(/-/g,"\t-\t")
      .replace(/Sat:/g,"Sat: ")
    })
    /*this.fillDataTable();
    console.log(this.state.dataTable)
    console.log(dataTable)*/
  }

  //Print table with gas and price data this.state.datosGasolinera.fuels_gas
  processTableAndPrint = () => {
    if (this.state.datosGasolinera.fuels_gas) {

      const columnsFuel = [
        {
          title: 'Type',
          dataIndex: 'type',
          width: 105
        },
        {
          title: 'Price/l',
          dataIndex: 'price',
          width: 140
        },
      ];

      let dataTable = [];
      const arrayFuels = this.state.datosGasolinera.fuels_gas;
      for (let i = 0; i < arrayFuels.length; i++) {
        let objectPush = {
          'type': arrayFuels.[i].id_fuel,
          'price': arrayFuels.[i].price_fuel
        }
        dataTable.push(objectPush);
      }
      return (
        <Table height={100} columnWidth={60} columns={columnsFuel} dataSource={dataTable} />
      )
    } else {
      return (
        <Text style={{ color: 'black' }}>Indefinido</Text>
      )
    }
  }

  //Prints graphic with data read from state
  printGraphic = () => {
    return (
      <View style={styles.pricesView}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={15}
          formatLabel={(value) => `${value}€`}
        />
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={[50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]}
          formatLabel={(value, index) => `Day ${index}`}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'black' }}

        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={contentInset}
        >
          <Grid />
        </LineChart>
      </View>
    )
  }

  showServices = () => {
    let listServices = this.state.datosGasolinera.services_gas;
    if (listServices !== undefined) {
      let services = JSON.parse(servicesListToIcon);
      return (
        listServices.map((service_name, l) => (
          <View style={styles.containerServices}>
            <Text style={styles.plain}>{services.service_name}</Text>
            <Icon
              reverse
              style={styles.servicesIcon}
              name={services[service_name]}
              type='font-awesome'
              color='black'
              size={15}
              onPress={() => Alert.alert('Service:' + service_name)}
            />
          </View>
        )
        )
      )
    } else {
      return (
        <Text style={{ color: 'black' }}>Indefinido</Text>
      )
    }
  }

  changeReportModalState =() =>{
    this.setState({
      modalReportVisible: !this.state.modalReportVisible
    })
  }

  changeUpdateModalState =() =>{
    this.setState({
      modalUpdateVisible: !this.state.modalUpdateVisible
    })
  }

  setFuel = (fuelType) => {
    this.setState({
      fuel: fuelType
    })
  }

  setPrice = (price) => {
    this.setState({
      price: price
    })
  }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containerTop}>
            <Text style={styles.mainTitle}>Gas Station Info</Text>
            <Text style={styles.title}>
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
            <ScrollView horizontal={true} style={styles.servicesView}>
              {/* Prueba a llamar a los iconos dinamicamente */}
              {this.showServices()}
            </ScrollView >
          </View>
          <View style={styles.containerSchedule}>
            <Text style={styles.plainBold}>
              {'Schedule:'}
            </Text>
            <View style={styles.scheduleView}>
              <Text style={styles.plain}>
                {this.state.horario}
              </Text>
            </View>
          </View>
          <View style={styles.containerFuel}>
            <Text style={styles.plainBold}>
              {'Available fuel:'}
            </Text>
            <View style={styles.fuelView}>
              {this.processTableAndPrint()}
            </View>
          </View>
          <View style={styles.containerPrices}>
            <Text style={styles.plainBold}>
              {'Latest prices:'}
            </Text>
            {this.printGraphic()}
          </View>
          <View style={styles.containerButtons}>
          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalUpdateVisible}
              onRequestClose={() => {
                Alert.alert("Popup has been closed.");
              }}>
                <View style={styles.containerModal}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Select the fuel and type the price</Text>
                    <Picker
                      selectedValue={this.state.fuel}
                      style={{ height: 200, width: 200}}
                      onValueChange={(itemValue, itemIndex) => this.setFuel(itemValue)}
                    >
                      <Picker.Item label="Gas" value="Gas" />
                      <Picker.Item label="Gas Premium" value="Gasp" />
                      <Picker.Item label="Diesel" value="Diesel" />
                      <Picker.Item label="Diesel Premium" value="Dieselp" />
                    </Picker>
                    <TextInput
                      style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, textAlign:'center', fontSize:22 }}
                      keyboardType={'decimal-pad'}
                      onChangeText={text => this.setPrice(text)}
                      value={this.state.price}
                    />
                    <View style={styles.containerButtons}>
                      <Button
                        containerStyle={styles.button}
                        title="Save"
                        onPress={() => {
                          this.changeUpdateModalState();
                        }}
                      />
                      <Text>{"\t"}</Text>
                      <Button
                        containerStyle={styles.button}
                        title="Cancel"
                        onPress={() => {
                          this.changeUpdateModalState();
                        }}
                      />
                    </View>
                  </View>
                </View>
          </Modal>
            <Button
              containerStyle={styles.button}
              title="Update price"
              onPress={() => this.changeUpdateModalState()}
            />
            <Text>{"\t"}</Text>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalReportVisible}
              onRequestClose={() => {
                Alert.alert("Popup has been closed.");
              }}>
                <View style={styles.containerModal}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>What do you want to report?</Text>
                    <Button
                      containerStyle={styles.button}
                      title="Nothing, thank you!"
                      onPress={() => {
                        this.changeReportModalState();
                      }}
                    />
                  </View>
                </View>
            </Modal>
            <Button
              containerStyle={styles.button}
              title="Report problem"
              onPress={() => this.changeReportModalState()}
            />
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
    paddingBottom: '5%',
    backgroundColor: 'white'
  },
  containerServices: {
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  containerSchedule: {
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  containerFuel: {
    backgroundColor: 'white',
    // flexDirection: 'row'
  },
  containerPrices: {
    backgroundColor: 'white',
    // flexDirection: 'row'
  },
  containerButtons:{
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerModal:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    color:'black'
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
    color: 'black'
  },
  button: {
    backgroundColor: "yellow",
    alignSelf: "center",
    width: "40%",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 50
  },
  plain: {
    fontSize: 17,
    color: 'black',
  },
  plainBold: {
    fontSize: 23,
    color: 'black',
    fontWeight: "bold",
    paddingBottom: '5%',
    paddingTop: '5%',
    paddingLeft: '5%'
  },
  servicesView: {
    paddingTop: '2.5%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  scheduleView: {
    paddingTop: '5%',
    paddingLeft: '2.5%',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  fuelView: {
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  pricesView: {
    height: 300,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  //table

});
