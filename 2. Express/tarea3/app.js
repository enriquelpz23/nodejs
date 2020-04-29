const express = require("express"); 
const mainRoutes = require("./routes/index");
const path = require("path");

const app = express(); 

app.use(express.static(path.join(__dirname, "public")));

app.use(mainRoutes);



app.listen(3000); 


