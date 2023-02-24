//function to render ui
let planetData = document.querySelector('.planet-data');
let notFound = document.querySelector('.not-found');
export   function renderUi(planet){
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
     
     //function for update Ui for previous planet and new planet
    export function updateUi(id, planetList) {
        // creating a div for the planet card
        let targetCard = document.querySelector('.planet-card');
        let targetPlanet = {}
        planetList.forEach(element => {
        if(element.id === id){
        targetPlanet = element
        // adding html to the planet card to display planet data
        targetCard.innerHTML = `
         <h1>${targetPlanet.name}</h1>
         <p>${targetPlanet.desc}</p>
         <a class = "home-btn"  href="../info.html">mer info!</a>
         `;
          // appending planet card to planet Data div
          notFound.textContent = '';
       
        }
        });
    }
     