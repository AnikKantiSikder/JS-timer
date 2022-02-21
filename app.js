const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2022, 4, 21, 11, 30, 0);
//console.log(futureDate);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
//or
// let month = futureDate.getMonth();
// month = months[month];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];


giveaway.textContent = `giveaway ends on|
                        ${weekday}, ${date}
                        ${month} ${year}
                        ${hours}:${minutes}am`;
// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const remainingTime = futureTime - today; //result in miliseconds

  // 1s = 1000ms, 1m = 60s, 1hr = 60min, 1d = 24hr

  //values in ms
  const oneDay = 24*60*60*1000;
  const oneHour = 60*60*1000;
  const oneMinute = 60*1000;
  // calculate all values
  let days = Math.floor(remainingTime /oneDay);
  let hours = Math.floor((remainingTime % oneDay)/oneHour);
  let minutes = Math.floor((remainingTime % oneHour)/oneMinute);
  let seconds = Math.floor((remainingTime % oneMinute)/1000)
  // set values array
  const values = [days, hours, minutes, seconds];

  //when values in less than 10
  function format(item){
    if(item < 10){
      return (item = `0${item}`);
    }else{
      return item;
    }
  }

  items.forEach(function(item, index) {
    item.innerHTML = format(values[index]);
  });
  
  // stop countdown
  if(remainingTime < 0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">
    Sorry, this giveaway has expired
    </h4>`
  }
}
//countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();