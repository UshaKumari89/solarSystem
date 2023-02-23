//function to render ui
let planetData = document.querySelector('.planet-data');
let notFound = document.querySelector('.not-found');
export  default function renderUi(planet){
    // creating a div for the planet card
      let planetCard = document.createElement('div');
      // adding class to the planet card
      planetCard.classList.add('planet-card');
      // adding html to the planet card to display planet data
     
      planetCard.innerHTML = `
      <h1>${planet.name}</h1>
      <p>${planet.desc}</p>
      <a class = "home-btn"  href="../info.html">mer info!</a>
      `;
     // appending planet card to planet Data div
      planetData.innerHTML = planetCard.outerHTML;
      notFound.textContent = '';
    
     }
     