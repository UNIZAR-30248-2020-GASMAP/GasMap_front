import * as React from 'react';
import { Alert, Image, StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Icon } from 'react-native-elements';

import { getGasStationsById, updateGasServices } from '../drivers/connection';
import Table from 'react-native-simple-table';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { ListItem, Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { servicesListToIcon } from '../models/listServicesToIcon'









//Contantes para grafica, updatear al leer de bd
const dataX = [1, 2, 3, 4, 5];
const data = [1.10, 1.12, 1.09, 1.05, 1.0];
const contentInset = { top: 20, bottom: 20 }


export default class ManagerGasStation extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      datosGasolinera: [],
      chart: [1.10, 1.12, 1.9]
    };
  }

  async componentDidMount() {
    //Poner un Toast Loading mientras se realiza esta llamada para informar al usuario que se está cargando
    //Llamar a la función del back para ver los datos de la gasolinera que se quiere
    console.log("Voy a llamar a la funcion del back para obtener los datos de la gasolinera a partir del ID")
    await getGasStationsById(this.props.route.params.idGasolinera).then(data => {
      this.setState({ datosGasolinera: data })
      console.log(this.state.datosGasolinera)

      //cargar datos necesario en state
      //precios de fuel
      // this.setState({ chart: [] })
    })
  }

  //Muestra en filas separando por '\\n'
  processTime() {
    let timeGas = this.state.datosGasolinera.time_gas;
    console.log(this.state.datosGasolinera.time_gas);

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
          // let icon = services.{service_name}
          //Get value with property==service_name
          // console.log(service_name)
          <View style={styles.containerServices}>
            <Text style={styles.plain}>{services.service_name}</Text>
            <Icon
              reverse                                                                         //¿LO SACA NEGRO? ¿COMO ACCEDER A VARIABLE DENTRO DE name={.....}?
              style={styles.servicesIcon}
              name={services[service_name]}//{services.service_name} //{services.service_name}
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
      console.log("FUELS");
      
      let dataTable = [];
      const arrayFuels = this.state.datosGasolinera.fuels_gas;
      for(let i=0;i<arrayFuels.length;i++){
        console.log(i);
        let objectPush = {
          'type': arrayFuels.[i].id_fuel,
          'price': arrayFuels.[i].price_fuel
        }
        dataTable.push(objectPush);
        console.log("dataTable");
        console.log(dataTable);
      }
      return (
        <Table height={100} columnWidth={60} columns={columnsFuel} dataSource={dataTable} />
      )
    }else{
      return (
        <Text style={{ color: 'black' }}>Indefinido</Text>
      )
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
          </View>
          <View style={styles.containerSchedule}>
            <Text style={styles.plainBold}>
              {'Schedule:'}
            </Text>
            <View style={styles.scheduleView}>
              {/* {'Mon-Fri: 7:00-23:00\nSat-Sun: 9:00-15:00'} */}
              {this.processTime()}
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
    flexDirection: 'row'
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
