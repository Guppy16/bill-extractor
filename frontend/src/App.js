import React, { useState } from "react";
import ResultsPage from "./pages/ResultsPage.js";

export default function App() {
  const [imgName, setImgName] = useState(null);

  const handleClick = () => {
    setImgName("img4.jpg");
  };

  return (
    <React.Fragment>
      {/* Camera View */}
      <div></div>
      {/* Upload button */}
      <div>
        <button onClick={handleClick}>Upload picture</button>
      </div>
      {/* Results View */}
      {imgName && (
        <div>
          <ResultsPage fileName={imgName} />
        </div>
      )}
    </React.Fragment>
  );
}
