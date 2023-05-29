import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Prompt from "./pages/Chat";
import StartPage from "./pages/Start";
import Root from "./Root";

// ========= PRODUCTION ENV ONLY =========
// --------- COMMENT DURING DEV MDOE
// import { listen } from "@tauri-apps/api/event";
// useEffect(() => {
//   const unlisten = async () =>
//     await listen("scheme-request-received", async (event) => {
//       console.log("RECEIVED", event.payload);
//     });
//   return () => {
//     unlisten();
//   };
// }, []);
// ========= PRODUCTION ENV ONLY =========

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root>
      <StartPage />
    </Root>
  </React.StrictMode>
);
