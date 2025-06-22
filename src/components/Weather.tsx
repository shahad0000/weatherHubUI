import React from 'react'
import axios from 'axios';

    const BASEURL = "https://weatherhubapi.onrender.com/";

const getWeather = async () => {
    const res = await axios.get(`${BASEURL}weather?lat=24.71&lon=46.68`);
    console.log(res.data)
};
getWeather();


const Weather = () => {



  return (
    <div>
        This is the weather page
    </div>
  )
}

export default Weather