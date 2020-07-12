const functions = require('firebase-functions');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express('morgan');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());

//#region core#
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});
app.get("/__/sitemap.xml", (req,res) => {
    res.sendFile(__dirname + "/views/sitemap.xml");
})
app.get("/legal", (req, res) => {
    res.sendFile(__dirname + "/views/legal.html")
});

app.get("/discord", (req, res) => {
    res.redirect("https://discord.gg/byq9QE6");
});
app.get("/trello", (req, res) => {
    res.redirect("https://trello.com/b/IP5aA43e/oe-o");
});
//#endregion

if(process.argv.includes("--debug=true")) {
    app.listen(8029);
}

const firebase_export = functions.https.onRequest((request, response) => {
    if (!request.path) {
      request.url = `/${request.url}`
    }
    return app(request, response)
  })
  
module.exports = {
    firebase_export
}