//Import and set express
const express = require("express");
const app = express();

//Database

const db = require("./models")

//Define the PORT
const PORT =  process.env.PORT || 3000; 

//Create your database
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//Routing
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

//Start server
db.sequelize.sync().then(function(){
    app.listen(PORT, function(){
        console.log(`App is now listening on PORT: http://localhost:${PORT}`);
    });
});

module.exports = app;