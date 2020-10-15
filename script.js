const list = document.getElementById("list");
const description = document.getElementById("description");

const api = "https://pokeapi.co/api/v2/pokemon?limit=49";

/**
 * Try to parse a response as JSON data
 */
function transformToJson (response) {
    if (response.ok) {
        return response.json();
    }

    throw Error("Content not loaded");
}



/**
 * Clear the list of all its items
 */
function emptyList () {
    // ...
    

}

/** 
 * Create an item, fetch its data and setup event listener
 */
function createItem (pokemon) {
    // Create a li
    const item = document.createElement('li');
    const image = document.createElement('img');
    const id = document.createElement('span');
    const span = document.createElement('span');
   

    fetch(pokemon.url).then(transformToJson).then((infoPokemon) => {
        // ...

      list.appendChild(item)
      //infoPokemon.sprites.front_default
      
      image.src = infoPokemon.sprites.other["official-artwork"].front_default
      item.appendChild(image)
      
      id.innerText = infoPokemon.id;
      item.appendChild(id);

      span.innerText = infoPokemon.name
      item.appendChild(span);
 
      item.addEventListener("click" ,()=>{
          showDescription(infoPokemon);
      });
      
      console.log(infoPokemon);
    });
}

/**
 * fill the item list with values
 */


function fillList (json) {
    emptyList();
    json.results.forEach(createItem);
}

/**
 * Fill and display the description
 */
function showDescription (infoPokemon) {
    description.classList.add("show");


    const fields = description.querySelectorAll("dd");
    fields.forEach((dd) => {
    var classe = dd.classList[0];
    if(classe != "types"){
    dd.innerText = infoPokemon[classe];
    }else{
        dd.innerText = "";
        infoPokemon.types.forEach(type => {
            if(dd.innerText != ""){
                dd.innerText += ", ";  
            }
            dd.innerText += type.type.name;
            
        });
    }
        
    });
}

/**
 * Hide the description
 */
function hideDescription () {
    description.classList.remove("show");

    
}

// Fetch the API end-point and fill the list
fetch(api).then(transformToJson).then(fillList);
