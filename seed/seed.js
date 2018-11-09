//Import Database Model
const db = require("../models");
const products = require("./productList.js");
console.log(products.computer)

//Syncing our sequelize models
db.sequelize.sync().then(function () {
    db.Product.bulkCreate([
        products.computer,
        products.book,
        products.desk,
        products.bike,
        products.xbox,
        products.playdoh,
        products.foundation,
        products.tire,
        products.lays,
        products.b12
    ]).then(function (data) {
        console.log("Data successfully added");
    }).catch(function (error) {
        console.log("Error", error);
    });
})


