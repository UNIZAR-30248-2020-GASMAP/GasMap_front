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

export const updateGasServices = (id: number, arrayNewServices: Array<String>) => {
    return axios
        .post(`https://gps-testing-server.herokuapp.com/updateGasServices`, null,
        {
            headers: { "Content-type": "application/json" },
            params: {
                id: id,
                new_services: arrayNewServices
            }
        })
        .then(res => {
            console.log("Data: " + res)
            return res.data
        })
        .catch(err => {
            console.log("Error update services: " + err)
        })
}

//Get a gas station with the given 'id'
export const getGasStationsById = (id: number) => {
    return axios
        .get(`https://gps-testing-server.herokuapp.com/listById?id_gas=${id}`, {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            return res.data
        })
}

//Post to the backend to login a manager
export const postLogin = (manager) => {
    return axios
        .post(`https://gps-testing-server.herokuapp.com/loginManager`, null,
        {
            headers: { "Content-type": "application/json" },
            params: {
                email: manager.email,
                password: manager.password
            }
        })
        .then(res => {
            console.log("Data: " + res)
            return res.data
        })
        .catch(err => {
            console.log("Error login: " + err)
        })
}