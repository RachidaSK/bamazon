const ResfulAPI = require('./RestAPIClass.js');
const models = require("../models");

module.exports = function(app) {
    const product = new ResfulAPI("products", app, models.Product);
    product.findAll();
    product.create();
    product.delete("id");
    product.update("id");
}