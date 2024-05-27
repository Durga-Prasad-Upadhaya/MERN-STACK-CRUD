import { App } from "./App";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <GoogleOAuthProvider clientId="882982810678-droenf75fgh5ts312afn2sk379umf2m8.apps.googleusercontent.com">
      <ToastContainer
        closeButton={false}
        autoClose={2000}
        position={"top-right"}
      />
      <App />
    </GoogleOAuthProvider>
  </Router>
);
