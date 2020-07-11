const functions = require('firebase-functions');

const express = require('express');
const morgan = require('morgan');
const app = express('morgan');

app.use(express.static('public'))
app.use(morgan('dev'))

//#region core#
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});
app.get("/legal", (req, res) => {
    res.sendFile(__dirname + "/views/legal.html")
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