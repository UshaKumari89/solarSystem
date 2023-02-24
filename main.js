import {renderUi , updateUi} from '../module/renderUi.js';



//onload function would be called when the page is loaded
window.onload =()=>{
  let currentPlanet = localStorage.getItem('planet')
  // console.log(currentPlanet);
  clickElement(currentPlanet)
  }
  
//variable 
let searchPlanet = document.querySelector('.search-planet');
let searchButton = document.querySelector('.search-button');
let homePage = document.querySelector('.home-div');
let homeBtn = document.querySelector('.home-btn');
let planetInfo = document.querySelector('.planet-info');
let planetData = document.querySelector('.planet-data');
let notFound = document.querySelector('.not-found');


// fetch data from api and push it to planetsData array
 async function fetchData() {
  let resp = await fetch('https://majazocom.github.io/Data/solaris.json')
   let data = await resp.json();
   planetsData.push(...data);
  //  console.log(data);
   return data;
 }
 
 async function fetchPlanet(id) {
   let planets = await fetchData();
   let planet = planets.find((planet) => planet.id == id);
   // console.log(planet, 'planet from FetchPlanet');
   return planet;
 }

// array to store planets data
const planetsData = [];

// object to store planet data for search
let searchInfo = {};


 
 // search the planets when you click on the planet element
searchButton.addEventListener('click', () => {
if(!searchPlanet.value) {
    notFound.textContent = '';
    return;
  } // if input is empty return

  // find planet in planetsData array
  searchInfo = planetsData.find((planet) => {
    // if planet name is equal to input value return planet
    if (planet.name.toLowerCase()=== searchPlanet.value.toLowerCase()) {
      return planet;
    }
  });

  if (!searchInfo) {
    // if planet is not found then check if an existing planet was already showing if yes then hide it
    if (!planetInfo.classList.contains('hide')) {
      planetInfo.classList.add('hide');
    }
    notFound.textContent = 'Opps!!! No such planet Please try again with the new planet';
    notFound.style.display = 'block';
    // console.log(notFoundSpan);
    return;
  }
  
  
  //store the planet info in the local storage
localStorage.setItem('planet' , searchInfo.id)
renderUi(searchInfo)

  // adding event listener to home button to go back to home page
  // and remove planet info from the page and clear the input
  // the remove the hide class from home page to make it visible
  homeBtn.addEventListener('click', () => {
    planetInfo.classList.add('hide');
    searchPlanet.value = '';
    homePage.classList.remove('hide');
  });
  if (planetInfo.classList.contains('hide')) {
    planetInfo.classList.remove('hide');
    homePage.classList.add('hide');
  }
    console.log(searchInfo);
  
})

//onclick function called when you click on the planet
function onclick(){
  let planetsEl = document.querySelectorAll('a')
  planetsEl.forEach((planet , id)  => { 
  let currentPlanet =  id 
  planet.addEventListener('click', ()=>{
  localStorage.setItem('planet' , currentPlanet)
  console.log(planet);
})
})
}
onclick();


 //function to render ui when you click on target element
 async function clickElement(id) {
 let planet = await fetchPlanet(id)
 
  let container = document.querySelector('.planet-data')
  // creating a div for the planet card
  let planetCard = document.createElement('div');
  // adding class to the planet card
  planetCard.classList.add('planet-card');
  // adding html to the planet card to display planet data
 
  planetCard.innerHTML = `
  <h1>${planet.name}</h1>
  <p>${planet.desc}</p>
  <h3>Omkrets:</h3><span>${planet.circumference}</span>
  <hr>
  <h3>Km från solen:</h3><span>${planet.distance}</span>
  <hr>
  <h3>Max temp:</h3><span>${planet.temp.day}</span>
  <hr>
  <h3>Min temp:</h3><span>${planet.temp.night}</span>
  <hr>
  <h3>Månar</h3><span>${planet.moons}</span>
  <hr>`;
  
  // appending planet card to planet Data div
  // planetData.innerHTML = planetCard.outerHTML;
  // notFound.textContent = '';
  

   container.appendChild(planetCard)
   
   onNextPlanetClick(planetCard)
   onPreviousPlanetClick(planetCard)

 }

 //Render UI...

 let planetList = await fetchData()
 
 // onPreviousPlanetClick button click
 function onPreviousPlanetClick(currentPlanet) {
  let nextBtn = document.querySelector('#next-btn');
  nextBtn.addEventListener('click', () => {
  planetId--
  updateUi(planetId, planetList)
 
  
  });
}
 // onNextPlanetClick button click
let planetId = parseInt(localStorage.getItem('planet'))
 function onNextPlanetClick(currentPlanet) {
  let backBtn = document.querySelector('#back-btn');
  backBtn.addEventListener('click', () => {
  planetId++
  updateUi(planetId, planetList)

  });
}

