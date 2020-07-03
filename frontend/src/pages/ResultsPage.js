// Page to display results of OCR

import React, { useState, useEffect } from "react";
import * as GoogleAPIServices from "../GoogleAPIServices.js";

export default function ResultsPage({fileName}){

    const [txt, setTxt] = useState(null);

    useEffect(() => {
        const fetchData = async () => setTxt(await GoogleAPIServices.getTxt(fileName));
        fetchData();
        console.log(txt);
    },[])


    return(
        <div>
            {txt ? txt : "Loading"}
        </div>
    );
}