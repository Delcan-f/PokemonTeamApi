// Create and configure the server 
// and all its end points

const express = require("express");

// Create an instance of the Express system 
const app = express();

const mongoose = require("mongoose");

let databaseUrl = "";
switch (process.env.NODE_ENV?.toLocaleLowerCase()) {
    case "test":
        databaseUrl = "mongodb://localhost:27017/ExpressBuildAnAPI-test"
        break;
    case "dev":
    case "development":
        databaseUrl = "mongodb://localhost:27017/ExpressBuildAnAPI-dev"
        break;
    
    case "production":
        case "prod":
            databaseUrl = process.env.DATABASE_URL;
            break;

        default:
            console.error("Incorrect environment detected");
            process.exit();
            // break;
}
// After figuring out the DB URL,
// Connect to the DB using the URL 
const { connect } = require ("./database.js")
connect(databaseUrl)

app.get("/", (request, response) => {
    response.json({
        message: "Hello, world!"
    });
});

// Wildcard * means "match any route"
// Put this at the end of your route declarations 
// To catch anything that does not match an earlier route
app.get("*", (request, response) => {
    console.log("User tried to visit" + request.path);
    response.json({
        message: "Page not found",
        attemptedPath: request.path
    });
});

const {pokeApiRouter} = require("./controllers/PokeApiController.js")
app.user("/pokeapi", pokeApiRouter)

// Error handling catcher
// Applies to EVERY route in the entire server
app.use((error, request, response, next) => {
    console.log("Error occured in the server");
    console.log(JSON.stringify(error));
    response.json({
        errors: request.body?.errors,
        message: error.message
    });
});


module.exports = {
    app,
}