import React, { useState } from "react";
// import ResultsPage from "./pages/ResultsPage.js";

export default function App() {
  const [imgName, setImgName] = useState(null);
  const [text, setText] = useState("Please upload an image");

  const handleUpload = () => {
    setImgName("img4.jpg");
    // Immediately try and get the OCR
    // handleUpload();
  };

  const handleOCR = async () => {
    if (imgName) {
      // Make API request
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URI + `/GetOCRText?file_name=` + imgName
      );
      // console.log(res);
      const txt = await res.json();
      console.log(txt);
      setText(txt);
    } else {
      setText("You haven't uploaded the image");
    }
  };

  return (
    <React.Fragment>
      {/* Camera View */}
      <div></div>
      {/* Upload button */}
      <div>
        {/* Maybe delete the image after 30 mins? */}
        <button onClick={handleUpload}>Upload picture</button>
      </div>
      {/* Results View */}

      {/* Button */}
      <button onClick={handleOCR}>Use OCR</button>
      <div>{text}</div>
    </React.Fragment>
  );
}
