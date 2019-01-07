const HtmlRouteClass = require("./HtmlRouteClass.js");

module.exports = function (app) {
    const Home = new HtmlRouteClass("/Home", app, "../public/index.html");
    Home.sendFile();

    const Manager = new HtmlRouteClass("/Manager", app, "../public/manager.html");
    Manager.sendFile();
    
}