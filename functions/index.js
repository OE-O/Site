const functions = require('firebase-functions');
const express = require('express');
const exfolder = require('exfolder');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
app.use(express.static('public'));
app.use("/mods-raw", express.static('mods'));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024,
    
}))
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

//#region oeo cmd tool
app.get("/api/cli/version", (res, req) => {
    res.send({status: 200, version: "0.0.0"});
});
//#endregion

//#region Mods 
const mods = [];
exfolder.dirs('./mods', (err, result) => {
    result.forEach(res => {
        fs.readdirSync(res).filter(file => file.includes('artifact.json')).forEach(file => {
            const prop = require(res + "/artifact.json")
            var mod = {
                info: prop,
                zipPath: res + "/artifact.zip",
                imgPath: res + "/" + prop.imageFile,
                downloadURL: "https://oe-o.tk/api/mods/" + prop.id,
            }
            mods.push(mod);
        });
    });
    mods.forEach(mod => {
        app.get("/mods/" + mod.info.id, (req, res) => {
            res.sendFile(__dirname + "/views/mod.html");
        });
        app.get("/api/mods/" + mod.info.id, (req, res) => {
            res.send(mod.info);
        });
        app.get("/i/" + mod.info.id, (req, res) => {
            res.sendFile(mod.imgPath);
        })
        app.get("/d/" + mod.info.id + "-latest", (req, res) => {
            if(!mod.info.allowSiteDownload) {
                if(!mod.info.steam.hasSteam) return res.end("This mod is not available yet, please try again never.")
                return res.end("This mod does not allow you to download via our site, please download via steam.\nSteam:\n" + mod.info.steam.url);
            }
            res.sendFile(mod.zipPath);
        });
        console.log("Registered: " + mod.info.name)
    });    
    app.get("/api/mods", (req, res) => {
        res.send(mods);
    });
    app.get("/api/mods/checkID", (req, res) => {
        var anyMatches = false;
        mods.forEach(mod => {
            if(req.query.id == mod.info.id || anyMatches) {
                anyMatches = true;
                return;
            }
            return;
        });
        res.send({matches: anyMatches});
    });
    app.use(function(req, res) {
        res.status(400);
        res.sendFile(__dirname + "/views/404.html");
    });
});
//#endregion

if (process.argv.includes("--debug=true")) {
    app.listen(8029);
    console.log("Debug mode enabled. Listening at port 8029.")
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