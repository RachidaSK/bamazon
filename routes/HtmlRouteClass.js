const path = require("path");

class HtmlRouteClass {
    constructor(routeName, app, filepath) {
        this.route = routeName;
        this.app = app;
        this.filepath = filepath;
    }
   sendFile() {
       this.app.get( this.route , (req,res) => {
           res.sendFile(path.join(__dirname, this.filepath));
       })
   }

}

module.exports = HtmlRouteClass;