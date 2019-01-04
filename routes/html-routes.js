const HtmlRouteClass = require("./HtmlRouteClass.js");

module.exports = function (app) {
    const bamazon = new HtmlRouteClass("/Home", app, "../public/index.html");
    bamazon.sendFile();
    
}