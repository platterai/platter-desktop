import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Prompt from "./pages/Prompt";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn";
import Root from "./Root";

import { listen } from "@tauri-apps/api/event";

useEffect(() => {
  const unlisten = async () =>
    await listen("scheme-request-received", async (event) => {
      console.log("RECEIVED", event.payload);
      // Handle the params from here, for instance storing the tokens
    });
  return () => {
    unlisten();
  };
}, []);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root>
      <Prompt />
      {/* <SignIn /> */}
      {/* <Settings /> */}
    </Root>
  </React.StrictMode>
);
