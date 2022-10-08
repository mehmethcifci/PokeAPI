console.log("index")

const pokeApi = "https://pokeapi.co/api/v2/"

const getAllPokemon = async () => {
    const res = await fetch(pokeApi + "pokemon?limit=151");
    const data = await res.json();
    console.log(data.results[0].url.slice(-2, -1));
    return data.results;
}


const getPokemonById = async (id) => {
    const res = await fetch(`${pokeApi}pokemon/${id}`);
    const data = await res.json();
    console.log(data)
    return data
}

getPokemonById(1);

const getPokemon = async (pokemon) => {
    const res = await fetch(pokemon.url);
    const data = await res.json();
    // console.log(data);
    return data;
}


const renderPokemon = (pokemonData) => {
    const container = document.querySelector("main");
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("card");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const pokemonImg = document.createElement("img");
    pokemonImg.setAttribute("src", pokemonData.sprites.other['official-artwork'].front_default)

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content")

    const cardTitle = document.createElement("h3");
    cardTitle.innerText = `#${pokemonData.id} - ${pokemonData.name}`;

    const typeTitle = document.createElement("h4");
    typeTitle.innerText = "Type:"

    const types = document.createElement("ul");
    pokemonData.types.forEach(typeObj => {
        types.innerHTML += `<li>${typeObj.type.name}</li>`
    })

    cardContent.append(cardTitle)
    cardContent.append(typeTitle);
    cardContent.append(types);

    imgContainer.append(pokemonImg);
    pokemonCard.append(imgContainer);
    pokemonCard.append(cardContent);
    container.append(pokemonCard);

    // const template = 
    // `<div class="card">
    //     <div class="img-container">
    //         <img src=${pokemonData.sprites.other['official-artwork'].front_default} alt="">
    //     </div>
    //     <div class="card-content">
    //         <h3 class="card-title">Bulbasaur</h3>
    //         <h4>Type:</h4>
    //         <ul>
    //             <li>Grass</li>
    //             <li>Poison</li>
    //         </ul>
    //     </div>
    // </div>`
    // container.innerHTML += template;

}
getAllPokemon().then(res => res.forEach(pokemon => getPokemon(pokemon).then(pokemonData => renderPokemon(pokemonData))));

window.addEventListener("load", e => {
    const searchBar = document.querySelector("#searchbar");
    const content = document.querySelectorAll(".card");

    console.log(content);
})

// searchBar.addEventListener("input", e => {
//     cards.forEach(card => console.log(card))
// })
// getPokemonById(4).then(pokemonData => renderPokemon(pokemonData))