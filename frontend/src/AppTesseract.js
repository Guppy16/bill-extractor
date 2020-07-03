import React, { useState, useCallback } from "react";
import "./App.css";
// var Tesseract = window.Tesseract;

import Tesseract from "tesseract.js";

export default function AppTesseract() {
  const [uploads, setUploads] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [docs, setDocs] = useState([]);

  // Create a URL for each file uploaded
  const handleChange = (event) => {
    if (event.target.files[0]) {
      var uploadURLS = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        uploadURLS.push(URL.createObjectURL(upload));
      }
      setUploads(uploads.concat(uploadURLS));
    } else {
      setUploads([]);
    }
  }

  const reset = useCallback(() => {
    setDocs([])
    setPatterns([])
    console.log(docs)
  }, [])

  // Generate text through tesseract
  const generateText = () => {
    // Reset docs and patterns
    reset();    
    setDocs([]);
    console.log(docs)
    uploads.forEach((upload, i) => {
      console.log("HERE")
      console.log(upload);
      Tesseract.recognize(upload, "eng", { logger: (m) => console.log(m) })
        .catch((err) => {
          console.error(err);
        })
        .then(({data}) => {
          console.log(data);
          let confidence = data.confidence; // Get confidence score
          let text = data.text; // Get full output
          let pattern = data.text.match(/\b\w{2,2}\b/g);
          console.log("PATTERN")
          console.log(pattern)

          // Update state
          setPatterns(patterns.concat(pattern));
          setDocs(
            docs.concat({
              pattern: pattern,
              text: text,
              confidence: confidence,
            })
          );
        });
    })
  }

  return (
    <div className="app">
      <header className="header">
        <h1>My OCR App</h1>
      </header>

      {/* FILE UPLOADER */}
      <section className="hero">
        <label className="fileUploaderContainer">
          Click here to upload documents
          <input
            type="file"
            id="fileUploader"
            onChange={handleChange}
            multiple
          />
        </label>

        <div>
          {/* PREVIEW FILE */}
          {uploads.map((val, i) => {
            return <img key={i} src={val} width="100px" />;
          })}
        </div>

        <button className="button" onClick={generateText}>
          Generate
        </button>
      </section>

      {/* RESULTS */}
      <section className="results">
        {docs.map((doc, i) => {
          return (
            <div key={i} className="results__result">
              <div className="results__result__image">
                <img src={uploads[i]} width="250px" />
              </div>
              <div className="results__result__info">
                <div className="results__result__info__codes">
                  <small>
                    <strong>Confidence Score:</strong> {doc.confidence / 100}
                  </small>
                </div>
                <div className="results__result__info__codes">
                  <small>
                    <strong>Pattern Output</strong>{" "}
                    {doc.pattern.map((pattern) => {
                      return pattern + ", ";
                    })}
                  </small>
                </div>

                <div className="results__result__info__text">
                  <small>
                    <strong>Full Output</strong> {doc.text}
                  </small>
                </div>
              </div>
              <hr />
            </div>
          );
        })}

        <div className="results__result">
          {/* ADDITIONAL OUTPUT IF MORE THAN ONE DOCUMENT */}
        </div>
      </section>
    </div>
  );
}
