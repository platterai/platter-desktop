import React from "react";
import ReactDOM from "react-dom/client";
import StartPage from "./pages/Start";
import Root from "./Root";

if (typeof global === "undefined") {
  window.global = window;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root>
      <StartPage />
    </Root>
  </React.StrictMode>
);
