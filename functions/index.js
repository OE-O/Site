const functions = require('firebase-functions');
const express = require('express');
const morgan = require('morgan');
const {
    Octokit
} = require('@octokit/rest');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express('morgan');
const GitHub = new Octokit({
    auth: "a60970bc125ea2c9d27825d5fba4de554b990adc",
});
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
//#region core# 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});
app.get("/legal", (req, res) => {
    res.sendFile(__dirname + "/views/legal.html")
});
app.get("/discord", (req, res) => {
    res.redirect("https://discord.gg/byq9QE6");
});
app.get("/trello", (req, res) => {
    res.redirect("https://trello.com/b/IP5aA43e/oe-o");
}); 
app.get("/apply", (req, res) => {
    res.sendFile(__dirname + "/views/apply.html")
})
//#endregion 
if (process.argv.includes("--debug=true")) {
    app.listen(8029);
}
const firebase_export = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}`
    }
    return app(request, response)
});

module.exports = {
    firebase_export
}