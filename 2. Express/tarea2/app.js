const express = require("express");

const app = express(); 

app.use("/users", (req, res, next) => {
    console.log("Hello from user middleware");
    res.send("<h1>Hello from Users!</h1>");
});

app.use("/", (req, res, next) => {
    console.log("Hello from root middleware");
    res.send("<h1>Hello from Home!</h1>");
});

app.listen(3000);


