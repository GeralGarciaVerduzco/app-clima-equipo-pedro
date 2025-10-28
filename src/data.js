// src/data.js

// Función auxiliar para convertir Celsius a Fahrenheit
const cToF = (c) => (c * 9 / 5 + 32).toFixed(1);

export const climaCiudad = {
  
  // Datos principales para la tarjeta grande
  city: "Cancún",
  state: "Quintana Roo",
  country: "MX",
  current: {
    // Usamos el valor original en Celsius y generamos Fahrenheit
    temperatureC: 31.3,
    temperatureF: cToF(31.3),
    minTempC: 31.3,
    minTempF: cToF(31.3),
    maxTempC: 32.6,
    maxTempF: cToF(32.6),
    feelsLikeC: 33.5,
    feelsLikeF: cToF(33.5),
    condition: "Parcialmente Nublado",
    icon: "./img/weather-cloud.png", 
    humidity: 78, // Porcentaje
    windSpeed: 3.1, // m/s
    clouds: 40, // Porcentaje
    pressure: 1012, // hPa
    visibility: 10000, // m
    sunrise: "05:44 a. m.",
    sunset: "06:53 p. m.",
    date: "01 Oct, 2025",
    time: "08:57 a. m."
  },
  // Datos del pronóstico (usamos la estructura de tu HTML)
  forecast: [
    { time: "01 Oct, 08:30 a. m.", icon: "./img/weather-cloud.png", minC: 31.3, maxC: 32.6, minF: cToF(31.3), maxF: cToF(32.6) },
    { time: "01 Oct, 11:30 a. m.", icon: "./img/weather-cloud.png", minC: 30.8, maxC: 31.9, minF: cToF(30.8), maxF: cToF(31.9) },
    { time: "01 Oct, 02:30 p. m.", icon: "./img/weather-storm.png", minC: 30.1, maxC: 33.0, minF: cToF(30.1), maxF: cToF(33.0) },
    { time: "01 Oct, 05:30 p. m.", icon: "./img/weather-wind.png", minC: 31.0, maxC: 34.5, minF: cToF(31.0), maxF: cToF(34.5) },
    { time: "01 Oct, 08:30 p. m.", icon: "./img/weather-fog.png", minC: 29.6, maxC: 33.2, minF: cToF(29.6), maxF: cToF(33.2) },
    { time: "01 Oct, 11:30 p. m.", icon: "./img/weather-sunny.png", minC: 29.1, maxC: 31.5, minF: cToF(29.1), maxF: cToF(31.5) },
    { time: "02 Oct, 02:30 a. m.", icon: "./img/weather-rain.png", minC: 28.4, maxC: 30.2, minF: cToF(28.4), maxF: cToF(30.2) },
    { time: "01 Oct, 05:30 p. m.", icon: "./img/weather-wind.png", minC: 31.0, maxC: 34.5, minF: cToF(31.0), maxF: cToF(34.5) },
    { time: "01 Oct, 08:30 p. m.", icon: "./img/weather-fog.png", minC: 29.6, maxC: 33.2, minF: cToF(29.6), maxF: cToF(33.2) },
    { time: "01 Oct, 11:30 p. m.", icon: "./img/weather-sunny.png", minC: 29.1, maxC: 31.5, minF: cToF(29.1), maxF: cToF(31.5) },
    { time: "03 Oct, 08:30 a. m.", icon: "./img/weather-cloud.png", minC: 31.3, maxC: 32.6, minF: cToF(31.3), maxF: cToF(32.6) },
    { time: "03 Oct, 11:30 a. m.", icon: "./img/weather-cloud.png", minC: 30.8, maxC: 31.9, minF: cToF(30.8), maxF: cToF(31.9) },
    { time: "03 Oct, 02:30 p. m.", icon: "./img/weather-storm.png", minC: 30.1, maxC: 33.0, minF: cToF(30.1), maxF: cToF(33.0) },
    { time: "03 Oct, 05:30 p. m.", icon: "./img/weather-wind.png", minC: 31.0, maxC: 34.5, minF: cToF(31.0), maxF: cToF(34.5) },
    { time: "03 Oct, 08:30 p. m.", icon: "./img/weather-fog.png", minC: 29.6, maxC: 33.2, minF: cToF(29.6), maxF: cToF(33.2) },
    { time: "03 Oct, 11:30 p. m.", icon: "./img/weather-sunny.png", minC: 29.1, maxC: 31.5, minF: cToF(29.1), maxF: cToF(31.5) },

    

  ]
};

// (Dentro de tu archivo data.js, después de 'climaCiudad')

export const lunasSemana = [
  {

    dia: "Lun 27",
    fase: "Cuarto Creciente",
    img: "/img/creciente.png",

  },
  {
    dia: "Mar 28",
    fase: "Cuarto Creciente",
    img: "/img/creciente.png",
  },
  {
    dia: "Mié 29",
   fase: "Luna Nueva",
    img: "/img/nueva.png",
  },
  {
    dia: "Jue 30",
    fase: "Luna Llena",
    img: "/img/llena.png",
  },
  {
    dia: "Vie 31",
    fase: "Luna Nueva",
    img: "/img/nueva.png",
  },
  {
    dia: "Sáb 1",
    fase: "Luna Llena",
    img: "/img/llena.png",
  },
  {
    dia: "Dom 2",
    fase: "Cuarto Creciente",
    img: "/img/creciente.png",
  },  {

    dia: "Lun 3",
    fase: "Cuarto Creciente",
    img: "/img/creciente.png",

  },
  {
    dia: "Mar 4",
    fase: "Cuarto Creciente",
    img: "/img/creciente.png",
  },
  {
    dia: "Mié 5",
   fase: "Luna Nueva",
    img: "/img/nueva.png",
  },
  {
    dia: "Jue 6",
    fase: "Luna Llena",
    img: "/img/llena.png",
  },
  {
    dia: "Vie 7",
    fase: "Luna Nueva",
    img: "/img/nueva.png",
  },
  {
    dia: "Sáb 8",
    fase: "Luna Llena",
    img: "/img/llena.png",
  },
];