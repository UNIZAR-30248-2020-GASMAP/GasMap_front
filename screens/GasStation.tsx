import * as React from 'react';
import { Alert, Image, StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Icon } from 'react-native-elements';

import { getGasStationsById } from '../drivers/connection';
import Table from 'react-native-simple-table';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'



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




const dataTable = [{ 'type': 'Diesel', 'price': '1.05' }, { 'type': 'Gas95', 'price': '1.10' },{ 'type': 'Gas98', 'price': '1.15' }]
//Contantes para grafica, updatear al leer de bd
const dataX = [1, 2, 3, 4, 5];
const data = [1.10, 1.12, 1.09,1.05,1.0];
const contentInset = { top: 20, bottom: 20 }


export default class GasStation extends React.Component {

  constructor(props: any) {
    super(props)
    this.state = {
      idGasolinera: 2,
      datosGasolinera: [],
      chart: [1.10, 1.12, 1.9]
    };
  }

  async componentDidMount() {
    //Poner un Toast Loading mientras se realiza esta llamada para informar al usuario que se está cargando
    //Llamar a la función del back para ver los datos de la gasolinera que se quiere
    console.log("Voy a llamar a la funcion del back para obtener los datos de la gasolinera a partir del ID")
    await getGasStationsById(this.state.idGasolinera).then(data => {
      console.log("ROUTE");
      console.log(this.props.route);
      console.log("DATOS GASOLINERA A PARTIR DEL ID")
      console.log(data)
      this.setState({ datosGasolinera: data })
    })

  }

  render() {
    console.log("RENDER");
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
              {/* {this.getIcons(nameIcons)} */}
              <Icon
                reverse
                style={styles.servicesIcon}
                name='wheelchair'
                type='font-awesome'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service: Wheelchair')}
              />
              <Icon
                reverse
                style={styles.servicesIcon}
                name='cc-mastercard'
                type='font-awesome'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service: Credit Card available')}
              />
              <Icon
                reverse
                style={styles.servicesIcon}
                name='wind'
                type='font-awesome-5'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service: Air pump')}
              />
              <Icon
                reverse
                style={styles.servicesIcon}
                name='water'
                type='font-awesome-5'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service: Water hose')}
              />
              <Icon
                reverse
                style={styles.servicesIcon}
                name='wind'
                type='font-awesome-5'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service: Water hose')}
              />
              <Icon
                reverse
                style={styles.servicesIcon}
                name='water'
                type='font-awesome-5'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service: Water hose')}
              />
              <Icon
                reverse
                style={styles.servicesIcon}
                name='wind'
                type='font-awesome-5'
                color='black'
                size={15}
                onPress={() => Alert.alert('Service: Water hose')}
              />
            </ScrollView >
          </View>
          <View style={styles.containerSchedule}>
            <Text style={styles.plainBold}>
              {'Schedule:'}
            </Text>
            <View style={styles.scheduleView}>
              <Text style={styles.plain}>
                {'Mon-Fri: 7:00-23:00\nSat-Sun: 9:00-15:00'}
              </Text>
            </View>
          </View>
          <View style={styles.containerFuel}>
            <Text style={styles.plainBold}>
              {'Available fuel:'}
            </Text>
            <View style={styles.fuelView}>
              <Table height={100} columnWidth={60} columns={columnsFuel} dataSource={dataTable} />
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
    paddingTop: '15%',
    paddingBottom: '10%',
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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  //table

});
