const BASEURL =
  "https://v6.exchangerate-api.com/v6/d4397513f5188dea9d4cfdcf/latest";

const dropdowns = document.querySelectorAll(".dropdown select");

const button = document.querySelector(".submit");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

let finalMsg = document.getElementById("final-msg");

let i = 0;
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.textContent = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); // evt.target gives where the change has occured in the select , like changing of the option
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode]; // IN , EU
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

button.addEventListener("click", async (evt) => {
  evt.preventDefault(); // prevents the default actions which were occuring on form submission
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASEURL}/${fromCurr.value}`;
  let response = await fetch(URL);

  let data = await response.json();

  let rate = data.conversion_rates[toCurr.value];
  let final = amtVal * rate;
  finalMsg.textContent = `${amtVal} ${fromCurr.value} = ${final} ${toCurr.value}`;
});
