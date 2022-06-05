// ------------ current location ------------
const cityName = document.getElementById("city-name");
const countryName = document.getElementById("country-name");
const regionName = document.getElementById("region-name");

// -------------today's weather------------
const weatherName = document.getElementById("weather-name");
const celcious = document.getElementById("celcious");
const dateAndTime = document.getElementById("date-time");
const weatherImage = document.getElementById("weather-img");

// -------------forcast ---------------
const forcastDateDay2 = document.getElementById("forcast-date-day2");
const day2Image = document.getElementById("day2Image");
const forcastNameDay2 = document.getElementById("forcast-name-day2");
const forcasteCiousDay2 = document.getElementById("forcast-celcious-day2");

const forcastDateDay3 = document.getElementById("forcast-date-day3");
const day3Image = document.getElementById("day3Image");
const forcastNameDay3 = document.getElementById("forcast-name-day3");
const forcasteCiousDay3 = document.getElementById("forcast-celcious-day3");

let crd, getValues;
let city = "rohtak";
const options = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 0,
};

async function success(pos) {
  crd = await pos.coords;
  getData(crd);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function getData(lct) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b3521d5b74b242e7adf82909212109&q=${lct.latitude},${lct.longitude}&days=4&aqi=yes&alerts=yes`
  )
    .then((result) => result.json())
    .then((show) => {
      console.log(show);
      getValues = show;
      weatherData(getValues);
    });
}

function weatherData(data) {
  cityName.innerHTML = data.location.name;
  countryName.innerHTML = data.location.country;
  regionName.innerHTML = `(${data.location.region})`;
  weatherName.innerHTML = data.current.condition.text;
  celcious.innerHTML = data.current.temp_c + "&degC";
  dateAndTime.innerHTML = `Updated at: ${data.current.last_updated}`;
  weatherImage.setAttribute("src", data.current.condition.icon);

  // forcast
  forcastDateDay2.innerHTML = data.forecast.forecastday[1].date;
  day2Image.setAttribute(
    "src",
    data.forecast.forecastday[1].day.condition.icon
  );
  forcastNameDay2.innerHTML = data.forecast.forecastday[1].day.condition.text;
  forcasteCiousDay2.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}&degC | ${data.forecast.forecastday[1].day.mintemp_c}&degC`;
  //  next day
  forcastDateDay3.innerHTML = data.forecast.forecastday[2].date;
  day3Image.setAttribute(
    "src",
    data.forecast.forecastday[2].day.condition.icon
  );
  forcastNameDay3.innerHTML = data.forecast.forecastday[2].day.condition.text;
  forcasteCiousDay3.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}&degC | ${data.forecast.forecastday[2].day.mintemp_c}&degC`;
}
