import axios from 'axios'

//Get the gas stations given a latitude and longitude coordinates 
export const getGasStations = (coords) => {
    return axios
        .get(`https://gps-testing-server.herokuapp.com/listByDistance?lat=${coords.lat}&lon=${coords.lon}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            return res.data
        })
}

//Get a gas station with the given 'id'
export const getGasStationsById = (id) => {
    return axios
        .get(`https://gps-testing-server.herokuapp.com/listById?id_gas=${id}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            return res.data
        })
}

//Post to the backend to login a manager
export const postLogin = (_email: string, _password: string) => {
    return axios
        .post(`https://gps-testing-server.herokuapp.com/loginManager?email=${_email}&password=${_password}`, {
            headers: { "Content-type": "application/json" }, 
            email: _email,
            password: _password
        })
        .then(res => {
            console.log("Data: " + res)
            return res.data
        })
        .catch(err => {
            console.log("Error login: " + err)
        })
}