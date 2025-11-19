import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Navbar from "./components/blocks/Navbar.tsx";
import Footer from "./components/blocks/Footer.tsx";
import AppLogoOnNavbar from "./undraw_health_logo.png"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar headerAppLogo={AppLogoOnNavbar}/>
        <div className="flex-grow">
          <App />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
);
