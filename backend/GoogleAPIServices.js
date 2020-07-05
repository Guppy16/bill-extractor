// DEPRACATED

// Imports the Google Cloud client library.
const { Storage } = require("@google-cloud/storage");

// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
// console.log(process.env.REACT_APP_GOOGLE_API);
const storage = new Storage({
  projectId: "guppy16-cbade",
  keyFilename: process.env.REACT_APP_GOOGLE_API,
});

// Makes an authenticated API request.
async function listBuckets() {
  try {
    const results = await storage.getBuckets();
    // NOTE: Doesn't actually get anything?
    // SOLUTION: Run this in backend!!!
    console.log(results);
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

// Make request to sent a picture to guppy_image_bucket for OCR processing
export async function uploadImg(filePath) {
  console.log(filePath);
  const bucketName = "guppy_image_bucket";
  await storage.bucket(bucketName).upload(filePath, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // Can change name of object in bucket by setting the option `destination`
    metadata: {
      // Assumuing contents of file changes NOTE: may need to check this for performance
      // IF not, enable long-lived HTTP caching headers: `cacheControl: 'public, max-age=31536000'`
      cacheControl: "no-cache",
    },
  });

  console.log(`${filePath} uploaded to ${bucketName}.`);
}

// Make request to get txt file from guppy_text_bucket
export async function getTxt(fileName) {
  console.log(fileName);
  const bucketName = "guppy_text_bucket";
  const data = await fetch(
    `https://storage.googleapis.com/storage/v1/b/${bucketName}/o/${fileName}_to_en.txt?alt=media`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_GOOGLE_OAUTH,
      },
    }
  )
    .then((res) => res.text())
    .catch((err) => console.error(err));
  console.log(data);
  return data;
}
