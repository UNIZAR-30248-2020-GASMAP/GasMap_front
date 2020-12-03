import * as React from 'react';
import { Alert, Image, StyleSheet, ScrollView, Modal, Picker, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Icon, Button } from 'react-native-elements';

import { getGasStationsById, updateGasServices, allServices, updatePriceMan } from '../drivers/connection';
import Table from 'react-native-simple-table';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { ListItem, Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { servicesListToIcon } from '../models/listServicesToIcon'
import { DeviceEventEmitter } from 'react-native'





export const FORMAT_BACK = "FORMAT_BACK";
export const FORMAT_EDIT = "FORMAT_EDIT";

export default class ManagerGasStation extends React.Component {


  constructor(props: any) {
    super(props)
    this.state = {
      datosGasolinera: [],
      allServices: [],
      horario: "",
      modalUpdateVisible: false,
      fuel: "Gas",
      price: "",
      fuelType: "" //for ghart
    };
  }

  // const willFocusSubscription: any = "";

  async componentDidMount() {
    console.log("COMPONENT DID MOUNT")
    this.getData();
    //   // DeviceEventEmitter.addListener('Listener data', async (e) => {
    //   //   //reload data
    //   // })
    //  this.willFocusSubscription = this.props.navigation.addListener(
    //   'willFocus',
    //   () => {
    //     console.log("RELOADING DATA");
    //     this.getData();
    //   }
    // );

  }



  async componentDidUpdate() {
    console.log("COMPONENT DID UPDATE")
    console.log("time_gas de this.props.route")
    console.log(this.props.route.params.datosGasolinera.time_gas)
    console.log("time_gas de this.state")
    console.log(this.state.datosGasolinera.time_gas)
    if (this.props.route.params.datosGasolinera !== undefined) {
      if (this.state.datosGasolinera != this.props.route.params.datosGasolinera) {
        console.log("UPDATEado")
        this.setState({ datosGasolinera: this.props.route.params.datosGasolinera })
        this.setState({ 
          horario: this.prettySchedule(this.props.route.params.datosGasolinera.time_gas, FORMAT_EDIT) 
        })
      }
    }
  }

  async getData() {
    //Poner un Toast Loading mientras se realiza esta llamada para informar al usuario que se está cargando
    //Llamar a la función del back para ver los datos de la gasolinera que se quiere
    console.log("Voy a llamar a la funcion del back para obtener los datos de la gasolinera a partir del ID")
    await getGasStationsById(this.props.route.params.idGasolinera).then(data => {
      this.setState({ datosGasolinera: data })
      console.log(this.state.datosGasolinera)
    })
    await allServices().then(data => {
      console.log("All services")
      // console.log(data)
      this.setState({ allServices: data })
    })
    this.setState({
      horario: this.prettySchedule(JSON.stringify(this.state.datosGasolinera.time_gas), FORMAT_BACK)
    })
  }


  //No llamar aqui a BD ya qe al ser async, volveria a llamar a render, que volveria a llamar a componentDidUpdate, generarando infinitas callbacks
  // componentDidUpdate(prevProps) {
  //   console.log("COMPONENT DID UPDATE")

  // }

  //Re-render component when data changes
  // componentWillMount() {
  //   console.log("COMPONENTE WILL MOUNT")

  //   DeviceEventEmitter.addListener('Listener data', async (e)=>{
  //     //reload data
  //     console.log("RELOADING DATA");
  //     this.getData();

  //     })
  // }



  //Muestra en filas separando por '\\n'
  processTime() {
    let timeGas = this.state.datosGasolinera.time_gas;

    if (timeGas !== undefined) {
      let arrayParts: Array<String> = timeGas.split('\\n');
      return (
        <View style={{ backgroundColor: 'white' }}>
          {
            arrayParts.map((parte, index) => (
              <Text style={styles.plain}>{parte}</Text>
            ))
          }
        </View>
      )
    }
  }

  showServices = () => {
    var a = ['Hola1', 'hola2']
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

  //Return array of last fuel prices
  getLastFuelPrices(fuelType) {
    //datos del fuel fuelType
    if (this.state.datosGasolinera !== undefined) {
      console.log("FUELS_GAS");
      console.log(this.state.datosGasolinera.fuels_gas);
      let data = this.state.datosGasolinera.fuels_gas.filter(index => {
        // console.log("INDEX");
        // console.log(index);
            return (index.id_fuel==fuelType)
      }
      );
      
        console.log("getFUEL: ");
        console.log(data[0].last_prices);
        return data[0].last_prices;
    }
  }

  //Prints graphic with last fuel prices
  printGraphic = (fuelType) => {
    //Contantes para grafica, updatear al leer de bd
    const dataX = [1, 2, 3, 4, 5];
    if (fuelType != "") {
      // const data = [1.10, 1.12, 1.09, 1.05, 1.0];
      console.log("FUEL TYPE")
      console.log(fuelType)
      const data = this.getLastFuelPrices(fuelType);
      const contentInset = { top: 20, bottom: 20 }
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
    } else {

    }
  }

  setFuelType = (fuelType) => {
    this.setState({
      fuelType: fuelType
    })
  }

  changeUpdateModalState = () => {
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

  updatePrice = async () => {
    const datos = {
      fuel: this.state.fuel,
      id_gas: this.props.route.params.idGasolinera,
      price: this.state.price.replace(",", ".")
    }
    await updatePriceMan(datos).then(data => {
      if (data == "Changed correctly") {
        Alert.alert("Success!", "The price has been updated correctly!", [{ text: "OK", onPress: () => this.changeUpdateModalState() }]);
      }
      else if (data == "Fuel added!") {
        Alert.alert("Success!", "You succesfully added a new type of fuel!", [{ text: "OK", onPress: () => this.changeUpdateModalState() }]);
      }
      else {
        Alert.alert("ERROR: ", "General ERROR: The price was not updated. Please try again later.", [{ text: "OK", onPress: () => this.changeUpdateModalState() }])
      }
    })
  }

  printIconEdit = (nameScreen) => {
    if (nameScreen == "editPrice") {
      return (
        <Icon
          reverse
          // style={styles.servicesIcon}
          name="pencil-square"
          type='font-awesome'
          color='blue'
          size={15}
          onPress={() => this.changeUpdateModalState()}

        />
      )
    }
    else {
      return (
        <Icon
          reverse
          // style={styles.servicesIcon}
          name="pencil-square"
          type='font-awesome'
          color='blue'
          size={15}
          onPress={() => this.props.navigation.navigate(nameScreen, { datosGasolinera: this.state.datosGasolinera, allServices: this.state.allServices })}

        />
      )
    }
  }

  prettySchedule = (schedule: string, format: string) => {
    if (format == FORMAT_BACK){
      return( schedule
      .replace(/\\\\n/g, "\n").replace(/\"/g, "").replace(/ /g, "\t")
      .replace(/Fri:/g, "Fri:  ").replace(/-/g, "\t-\t")
      .replace(/Sat:/g, "Sat: "))
    } else if (format == FORMAT_EDIT) {
      return( schedule
      .replace(/\\n/g, "\n").replace(/\"/g, "").replace(/ /g, "\t")
      .replace(/Fri:/g, "Fri:  ").replace(/-/g, "\t-\t")
      .replace(/Sat:/g, "Sat: "))
    } else {
      return "FORMAT ERROR"
    }
  } 

  render() {
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
            <View style={styles.separator}>

            </View>
          </View>
          <View style={styles.containerServices}>
            <Text style={styles.plainBold}>
              {'Services: '}
            </Text>
            <ScrollView horizontal={true} style={styles.servicesView}>
              {/* Prueba a llamar a los iconos dinamicamente */}
              {this.showServices()}
            </ScrollView >
            {this.printIconEdit("ManagerEditServices")}

          </View>
          <View style={styles.containerSchedule}>
            <Text style={styles.plainBold}>
              {'Schedule:'}
            </Text>
            <View style={styles.scheduleView}>
              <Text style={styles.plain}>
                {console.log("------------------")}
                {console.log(this.state.horario)}
                {console.log("------------------")}
                {this.state.horario}
              </Text>
            </View>
            {this.printIconEdit("ManagerEditSchedule")}
          </View>
          <View style={styles.containerFuel}>
            <Text style={styles.plainBold}>
              {'Available fuel:'}
            </Text>
            <View style={styles.fuelView}>
              {this.processTableAndPrint()}
              {this.printIconEdit("editPrice")}
            </View>
          </View>
          <View style={styles.containerPrices}>
            <Text style={styles.plainBold}>
              {'Latest prices:'}
            </Text>
            <Picker
              selectedValue={this.state.fuelType}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) => this.setFuelType(itemValue)}
            >
              <Picker.Item label="Gas" value="Gas" />
              <Picker.Item label="Gas Premium" value="Gas Premium" />
              <Picker.Item label="Diesel" value="Diesel" />
              <Picker.Item label="Diesel Premium" value="Diesel Premium" />
            </Picker>
            {this.printGraphic(this.state.fuelType)}
          </View>
        </View>
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
                style={{ height: 200, width: 200 }}
                onValueChange={(itemValue, itemIndex) => this.setFuel(itemValue)}
              >
                <Picker.Item label="Gas" value="Gas" />
                <Picker.Item label="Gas Premium" value="Gas Premium" />
                <Picker.Item label="Diesel" value="Diesel" />
                <Picker.Item label="Diesel Premium" value="Diesel Premium" />
              </Picker>
              <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, textAlign: 'center', fontSize: 22 }}
                keyboardType={'numeric'}
                onChangeText={text => this.setPrice(text)}
                value={this.state.price}
              />
              <View style={styles.containerButtons}>
                <Button
                  containerStyle={styles.button}
                  title="Save"
                  onPress={() => {
                    this.updatePrice();
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
  containerButtons: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerModal: {
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
  mainTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: '10%',
    // paddingBottom: '10%',
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
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
  servicesIcon: {

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
    alignItems: 'center'
  },
  pricesView: {
    height: 300,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  separator: {
    marginBottom: 5,
    height: 1,
    width: '100%',
  },
  //table

});
