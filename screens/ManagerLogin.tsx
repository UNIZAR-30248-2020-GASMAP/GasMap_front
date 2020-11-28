import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { postLogin } from '../drivers/connection'


//Manager Login Screen
export default class ManagerLogin extends React.Component {
  //datos estaticos para hacer pruebas
  state = {
    email: "edu@edu.edu",
    password: "123456"
  }

  constructor(props){
    super(props);
  }

  //Post request to the backend 
  async postLoginRequest(_email: string, _password: string) {
    console.log("Voy a llamar a la funcion POST")
    const manager = {
      email: _email,
      password: _password
    }
    await postLogin(manager).then(data => {
      console.log("DATA POST")
      console.log(data)
      if (data == undefined) {
        Alert.alert('Username or password incorrect');
      } else {
        console.log("DATA: postLogin" + JSON.stringify(data));
        console.log("ID_GAS: " + data.gas.id_gas);
        this.props.navigation.navigate("ManagerGasStation", {idGasolinera: data.gas.id_gas})
      }
    })
  }

  //Validates that 'email' has a correct pattern
  validate(email: string, password: string) {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      this.postLoginRequest(email, password)
      return true
    } else {
      Alert.alert('Please, use a valid email')
      return false
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>GasMap</Text>
        <View style={styles.inputView} >
          <TextInput
            keyboardType="email-address"
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ email: text })} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ password: text })} />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => this.validate(this.state.email, this.state.password)}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
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