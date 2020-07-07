import React, { useState } from "react";
// import ResultsPage from "./sections/ResultsPage.js";

export default function App() {
  const [text, setText] = useState("Please upload an image");
  const [imgData, setImgData] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  // Create a URL for each file uploaded
  const handleUploadLocal = (event) => {
    {
      /* Maybe delete the image after 30 mins? */
    }
    console.log(event.target.files);

    // Store data about first file
    const file = event.target.files[0];
    if (file) {
      setImgData({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type,
      });
      setImgFile(file);
    }
    // Immediately try and get the OCR ? Nah better to get "consent" by pressing a button
    // handleUpload();
  };

  // Upload image to img_bucket THEN download text from text_bucket
  const handleOCR = async () => {
    // Ensure img exists
    if (!imgData) {
      setText("You haven't uploaded the image");
      return;
    }

    // Convert image to a form
    let data = new FormData();
    data.append("ocr-image", imgFile);

    // POST img to rest api
    const res_upload = await fetch(
      process.env.REACT_APP_BACKEND_URI + "/ImageOCR",
      {
        method: "POST",
        body: data,
      }
    );
    console.log(res_upload);
    if (res_upload.status != 200) {
      setText("Something went wrong uploading to bucket");
      return;
    }

    // GET ocr data from rest api
    const res_download = await fetch(
      process.env.REACT_APP_BACKEND_URI + `/ImageOCR?file_name=` + imgData.name,
      { method: "GET" }
    );
    if (res_download.status == 200) {
      const txt = await res_download.json();
      console.log(txt);
      setText(txt);
    } else {
      console.log(res_download);
    }
  };

  const handleProcessText = () => {
    return;
  };

  return (
    <React.Fragment>
      {/* Camera View */}
      <div>
        <h3>Section to take a picture</h3>
      </div>

      {/* Upload Local File */}
      <div>
        <h3>Section to upload picture from local storage</h3>

        {/* <form
          action={process.env.REACT_APP_BACKEND_URI + "/ImageOCR"}
          method="post"
          encType="multipart/form-data"
        >
          <input type="file" name="avatar" />
          <input type="submit" value="Submit" />
        </form> */}

        <label>
          Click here to upload files
          <input
            type="file"
            id="fileUploader"
            onChange={handleUploadLocal}
            multiple={false}
          />
        </label>
      </div>

      {/* PREVIEW FILE */}
      {imgData && (
        <div>
          <img
            key={imgData.name}
            src={imgData.url}
            alt={imgData.name}
            height="100px"
          />
          <p>Image Name: {imgData.name}</p>
        </div>
      )}

      {/* Perform OCR */}
      <div>
        <h3>Section to upload file for image processing</h3>
        <button onClick={handleOCR}>Upload file for processing</button>
        <div>{text}</div>
      </div>

      {/* Results View */}
      <div>
        <h3>Section to View Processed OCR</h3>
        <button onClick={handleProcessText}>Use OCR</button>
      </div>
    </React.Fragment>
  );
}
