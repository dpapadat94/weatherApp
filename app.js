/////////////////////
let weatherobj = {
  weatherFetch(city, deg) {
    let unit;
    if (deg == "metric") {
      unit = "°C";
    } else {
      unit = "°F";
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${deg}&appid=42d333648831cca21205a251dd64005a`
    )
      .then((responce) => responce.json())
      .then((data) => this.displayWeather(data, unit));
  },

  displayWeather(data, unit) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;
    console.log(name, icon, description, temp);
    document.querySelector(".city").textContent = name;
    document.querySelector(".temp").textContent = `${temp} ${unit}`;
    document.querySelector(".city").textContent = name;
    document.querySelector(".description").textContent = description;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".update").innerHTML =
      "Updated: " + new Date().toLocaleTimeString();
  },

  search(unit) {
    let deg;
    if (unit == "c") {
      deg = "metric";
    } else {
      deg = "imperial";
    }
    this.weatherFetch(document.querySelector(".search-bar").value, deg);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weatherobj.search();
});
let i = 1;
document.querySelector("#cf-switch").addEventListener("click", function () {
  i++;
  if (i % 2 === 0) {
    weatherobj.search("c");
  } else {
    weatherobj.search("f");
  }
});

let homeCity;
document.querySelector(".setHome-Btn").addEventListener("click", function () {
  homeCity = document.querySelector(".search-bar").value;
  document.querySelector("#home-Btn").textContent = "Home: " + homeCity;

  document.querySelector("#home-Btn").addEventListener("click", function () {
    weatherobj.weatherFetch(homeCity, "imperial");
  });
});
