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
app.get("/__/sitemap.xml", (req, res) => {
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
}); //#endregion 
//#region Multiplayer API 
app.get("/api/multiplayer", (req, res) => {
    var jresponse = JSON.stringify({
        status: 200,
        message: "It works... yay?"
    });
    res.status(200).send(jresponse);
});
app.post("/api/multiplayer/issues/create", (req, res) => {
    var body = req.body;
    GitHub.issues.create({
        owner: "cal3432",
        repo: "software-inc-multiplayer",
        title: `${body.error.code}: ${body.error.message}`,
        body: `${body.error.code}: ${body.error.message}\n\`\`\`${body.error.stringed}\`\`\``,
        labels: ["In-game Error", "OE-O Bot"]
    });
    var jresponse = JSON.stringify({
        status: 200,
        message: "It works... yay?"
    });
    res.status(200).send(jresponse);
});
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