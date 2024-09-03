import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { OverDrawer } from "./lib";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div
      style={{
        height: "100%",
      }}
    >
      <OverDrawer />
      <div
        id="test"
        style={{
          position: "relative",
          backgroundColor: "black",
          height: "2000px",
          width: "80%",
        }}
      ></div>
    </div>
  </StrictMode>,
);
