import React, { useEffect } from "react";
import "./App.css";
import Footer from "./components/layout/Footer/Footer";
import HeaderNav from "./components/layout/NavBar/HeaderNav";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./utils/constants";
import ScrollToTop from "./components/common/ReusableComponent/ReusableComponent";

const App = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ToastProvider />
      <HeaderNav />
      <ScrollToTop />
      <AppRoutes />

      <Footer />
    </div>
  );
};

export default App;
