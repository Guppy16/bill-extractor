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
// May not be needed
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URI);
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

// GET request for OCR text
app.get("/GetOCRText", async (req, res) => {
  console.log("Getting OCR text from bucket");
  const fileName = req.query.file_name + "_to_en.txt";
  fileName
    ? console.log(fileName)
    : res.status(412).send("file_name not specified");
  try {
    const file = storage.bucket(txtBucket).file(fileName);

    // Check if file exists
    const exists = await file.exists();
    if (!exists[0]) {
      res.status(412).send("File doesn't exist");
    } else {
      // Read from file and send it
      const chunks = [];
      file
        .createReadStream()
        .on("error", (err) => res.status(500).send("Error " + err))
        .on("response", (res) => {})
        .on("end", () => res.status(200).send(JSON.stringify(Buffer.concat(chunks).toString())))
        .on("data", (chunk) => chunks.push(chunk));
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});

let port = process.env.PORT;
console.log(`Listening on port ${port}.`);
app.listen(port);
