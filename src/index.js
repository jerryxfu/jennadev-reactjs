import React from "react";
import ReactDOM from "react-dom/client";

import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger";

import App from "./App.js";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

gsap.registerPlugin(ScrollTrigger)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
