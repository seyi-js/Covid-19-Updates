import { GET_DATA, GET_TOTALS, GET_COUNTRIES } from './types'
import Axios from 'axios'


//Get Countries
export const getCountries = () =>dispatch=> {
    const config = {
        headers: {
            "content-type":"application/octet-stream",
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": process.env.API_KEY
        },
        "params":{
            "format":"json"
            }
    }//Returns Array
    Axios
        .get( "https://cors-anywhere.herokuapp.com/https://covid-19-data.p.rapidapi.com/help/countries", config )
        .then( res => dispatch( {
            type: GET_COUNTRIES,
            payload: res.data
        }) )
    .catch(err => console.log(err))
}

//Get Daily Report By Country Name

export const getDataByCountry = (country) =>dispatch=> {
    const config = {
        "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": process.env.API_KEY
        },
        "params": {
            "format":"json",
            "name":country
            }
//Gives An Array
      
    }

    Axios
        .get( "https://cors-anywhere.herokuapp.com/https://covid-19-data.p.rapidapi.com/country", config )
        .then( res => dispatch( {
            type: GET_DATA,
            payload: res.data
        }) )
    .catch(err => console.log(err))
}

//GET Totals 

export const getDataTotals = () => dispatch => {
    const key = process.env.REACT_APP_API_KEY
    console.log(key)
    const config = {
        "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": key
        },
        "params": {
            "format":"json"
            }
    } 
    
    Axios
        .get( "https://cors-anywhere.herokuapp.com/https://covid-19-data.p.rapidapi.com/totals", config )
        .then( res => dispatch( {
            type: GET_TOTALS,
            payload: res.data
        }) )
    .catch(err=> console.log(err))
}// Gives An Array