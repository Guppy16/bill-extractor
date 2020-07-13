const functions = require("firebase-functions");
const express = require("express");

const app = express();
app.get("/timestamp", (req, res) => {
  // Creates 'info' logs within firebase functions logs
  functions.logger.info("Hello logs!", { structuredData: true });

  res.send(`${Date.now()}`);
});

exports.app = functions.https.onRequest(app);
