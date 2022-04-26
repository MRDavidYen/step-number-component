
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/app"

const container = document.getElementById("root");
const rootDom = createRoot(container);
rootDom.render(<App></App>);