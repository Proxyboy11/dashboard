let inputBtn = document.querySelector(".input-btn");
let inputVal = document.querySelector("#input-el");
let inputCont = document.querySelector(".to-do-input-cont");
let wtrBtn = document.querySelector(".wtr-btn");
let wtrinput = document.querySelector(".wtr-el");
const baseUrl =
  "http://api.weatherapi.com/v1/current.json?key=938b7483d52d44ba981133330252401&q=";
let wtrCont = document.querySelector(".wtr-cont");
let trial = document.getElementById("wheather");
let timerCont = document.querySelector(".timer-cont");
let timerInputCont = document.querySelector(".timer-input-cont");
let timerBtn = document.getElementById("start-timer");
let resetBtn = document.getElementById("reset-btn");
let pauseBtn = document.getElementById("pause-btn");
let quoteBtn = document.getElementById("quote-el");
let countdown; // Will hold the setInterval ID
let remainingTime = 0; // Total seconds for countdown
let quotePara = document.querySelector(".quote-para");

inputBtn.addEventListener("click", () => {
  let newCont = document.createElement("div");
  newCont.classList.add("flex");

  let newVar = document.createElement("input");
  newVar.type = "text";
  newVar.value = inputVal.value;
  newVar.classList.add("non-og");

  let delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.textContent = "X";

  delBtn.addEventListener("click", () => {
    inputCont.removeChild(newCont);
  });

  newCont.append(newVar);
  newCont.append(delBtn);
  inputCont.append(newCont);
  inputVal.value = "";
});
wtrBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  const city = wtrinput.value;

  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;

  const geoResponse = await fetch(apiUrl);
  console.log(geoResponse);
  const geoData = await geoResponse.json();
  console.log(geoData);
  const { latitude, longitude } = geoData.results[0];
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  const weatherResponse = await fetch(weatherUrl);
  console.log(weatherResponse);
  const weatherData = await weatherResponse.json();
  console.log(weatherData);
  // const current = weatherData.current_weather;
  console.log(weatherData.current_weather.temperature);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("wtr-update");
  infoDiv.innerHTML = `
      <p>City: ${city}</p>
      <p>temperature: ${weatherData.current_weather.temperature}°C</p>
      <p>Wind speed :  ${weatherData.current_weather.windspeed} km/h</p>    
    `;
  document.getElementById("wtr-cont-id").appendChild(infoDiv);
});

timerBtn.addEventListener("click", () => {
  const hours = parseInt(document.getElementById("hr").value) || 0;
  const minutes = parseInt(document.getElementById("min").value) || 0;
  const seconds = parseInt(document.getElementById("sec").value) || 0;
  remainingTime = hours * 3600 + minutes * 60 + seconds;
  resetBtn.classList.remove("hide");
  pauseBtn.classList.remove("hide");
  if (remainingTime > 0) {
    clearInterval(countdown); // Clear any previous timer
    countdown = setInterval(updateTimer, 1000);
  }
});

function updateTimer() {
  if (remainingTime > 0) {
    remainingTime--;
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    document.getElementById(
      "timer-display"
    ).textContent = `${hours}:${minutes}:${seconds}`; //`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  } else {
    clearInterval(countdown);
    alert("Time's up!");
  }
}

//reset
resetBtn.addEventListener("click", () => {
  clearInterval(countdown);
  hours = "00";
  minutes = "00";
  seconds = "00";
  document.getElementById(
    "timer-display"
  ).textContent = `${hours}:${minutes}:${seconds}`; //`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  pauseBtn.classList.add("hide");
  resetBtn.classList.add("hide");
  document.getElementById("hr").value = "";
  document.getElementById("min").value = "";
  document.getElementById("sec").value = "";
});

// pause
pauseBtn.addEventListener("click", () => {
  clearInterval(countdown);
});

quoteBtn.addEventListener("click", async () => {
  console.log("button is clicked");
  let proxyUrl = "https://cors-anywhere.herokuapp.com/";
  let quoteUrl = "https://zenquotes.io/api/random";

  console.log("getting response...");
  let response = await fetch(proxyUrl + quoteUrl);
  console.log(response);
  console.log("getting data...");
  let data = await response.json();
  console.log(data); // Logs the quote data
  console.log("getting quote...");
  let quote = data[0].q;
  console.log(quote);

  quotePara.textContent = '"' + quote + '"';
});

async function fetchWeatherByCity(city) {}

// Example usage:
