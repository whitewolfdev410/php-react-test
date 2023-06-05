import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer style={{ fontSize: "0.8em" }} />
    <App />
  </BrowserRouter>
);
