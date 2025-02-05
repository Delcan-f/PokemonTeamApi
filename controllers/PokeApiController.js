const express = require("express");

const router = express.Router();

function checkForCoolPokemon(request, response, next){
    let allowedPokemon = [
        "pikachu",
        "squirtle",
        "snorlax",
        "garchomp",
        "dragonite"
    ];

    if (allowedPokemon.includes(request.params.name)){
        next();
    } else {
        next(new Error("Invalid Pokemon name requested."))
    }
}

// http://localhost:5678/pokeapi/style1/pikachu
// http://localhost:5678/pokeapi/style1/alex
router.get("/style1/:name", 
    checkForCoolPokemon , 
    async (request, response) => {
    let pokeApiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + request.params.name);
    let pokeApiData = await pokeApiResponse.json();

    respoinse.json({
        name: pokeApiData.name
    });
});

module.exports = {
    pokeapiRouter: router
}