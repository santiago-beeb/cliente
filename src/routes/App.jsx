import { useState } from "react";
import { AppContext } from "../context/AppContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../containers/layout";
import Home from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { CreateAccount } from "../pages/CreateAccount/CreateAccount";
import "./App.css";
import { NotFound } from "../pages/NotFound/NotFound";
import Checkout from "../pages/Checkout/Checkout";

function isUserAuthenticated() {
  const token = localStorage.getItem("token");
  return Boolean(token);
}

function App() {
  const [isLoggedIn, setLoggedIn] = useState(isUserAuthenticated);
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <AppContext.Provider
      value={{ isLoggedIn, setLoggedIn, isCartOpen, toggleCart }}
    >
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/" /> : <CreateAccount />}
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
