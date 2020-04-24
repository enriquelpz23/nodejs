const express = require("express");

const app = express();

app.use("/create-user" , (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from Create-user!</h1>');
});

app.use("/", (req, res, next) => {
    console.log('In the middleware!');
    res.send('<h1>This always run!</h1>'); // Allows the request to continue to the next middleware in line
});




app.listen(3000);