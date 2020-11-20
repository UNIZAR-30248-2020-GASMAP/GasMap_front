import axios from 'axios'

export const getGasStations = (coords) => {
    return axios
        .get(`https://gps-testing-server.herokuapp.com/listByDistance?lat=${coords.lat}&lon=${coords.lon}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            return res.data
        })
  }

//Post to the backend to login an user
export const postLogin = (email: string, password: string) => {
    return axios
        .post(`https://gps-testing-server.herokuapp.com/loginManager?email=${email}&password=${password}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            console.log("Data: " + res)
            return res.data
        })
}