const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const { Storage } = require("@google-cloud/storage");
var multer = require("multer"); // Make this const?
require("dotenv").config();

var upload = multer();  // No options given so that files aren't stored on disk
const storage = new Storage();
const txtBucket = "guppy_text_bucket";
const imgBucket = "guppy_image_bucket";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("You are in bill-extract backend");
});

app.get("/timestamp", (req, res) => {
  // Creates 'info' logs within firebase functions logs
  functions.logger.info("Hello logs!", { structuredData: true });

  res.send(`${Date.now()}`);
});

// POST request to upload image for OCR
app.post("/ImageOCR", upload.single('ocr-image'), (req, res) => {
  console.log("Uploading image to image bucket");
  console.log(req.file);
  res.sendStatus(200);
});

// GET request for OCR text
app.get("/ImageOCR", async (req, res) => {
  console.log("Getting OCR text from bucket");

  // Check for filename
  if (req.query.file_name) {
    console.log(req.query.file_name);
  } else {
    return res.status(412).send("file_name not specified");
  }

  const fileName = req.query.file_name + "_to_en.txt";

  // try getting OCR file from bucket
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
        .on("end", () =>
          res.status(200).send(JSON.stringify(Buffer.concat(chunks).toString()))
        )
        .on("data", (chunk) => chunks.push(chunk));
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error " + err);
  }
});

// Possibly rename 
// express.app to express.bill-extract-backend
exports.billExtractBackend = functions.https.onRequest(app);
