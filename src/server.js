// Create and configure the server and all its end points

const express = require("express");

// Create an instance of the Express system 
const app = express();

app.get("/", (request, response) => {
    response.json({
        message: "Hellow, world!"
    })
})



module.exports = {
    app,
}