const express = require("express");
const request = require("request");
const querystring = require("querystring");
const bodyParser = require("body-parser");
require("dotenv").config();
const fs = require("fs");
const readline = require("readline");
// const { google } = require("googleapis");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage();
const txtBucket = "guppy_text_bucket";
const imgBucket = "guppy_image_bucket";

// Test an authenticated API request.
async function listBuckets() {
  try {
    const results = await storage.getBuckets();
    const [buckets] = results;

    console.log("Buckets:");
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error("ERROR:", err);
  }
  return;
}
listBuckets();

const app = express();

app.get("/", (req, res) => {
  res.json("You are in bill-extract backend");
});

// USE functions to attach to headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URI);
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/GetOCRText", (req, res) => {
  console.log("Getting OCR text from bucket")
  const fileName = req.query.file_name;
  fileName ? console.log(fileName) : res.status(412).send("fileName not specified");
  try {
    const file = storage.bucket(txtBucket).file(fileName);
    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});

let port = process.env.PORT;
console.log(`Listening on port ${port}.`);
app.listen(port);
