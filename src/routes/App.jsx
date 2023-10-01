import { useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../containers/layout";
import Home from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { CreateAccount } from "../pages/CreateAccount/CreateAccount";
import "./App.css";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false); // Estado de autenticación
  const [nombre, setNombre] = useState(false); // Estado de nombre
  useEffect(() => {
    // Verificar si hay un token en el almacenamiento local
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  // Función para redirigir al usuario al inicio si está autenticado
  const redirectToHomeIfLoggedIn = () => {
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }
    return <Login setLoggedIn={setLoggedIn} setNombre={setNombre} />;
  };

  // Función para redirigir al usuario al inicio si está autenticado
  const redirectToHomeIfLoggedInSignup = () => {
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }
    return <CreateAccount setLoggedIn={setLoggedIn} />;
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, setLoggedIn, nombre, setNombre }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* Ruta de Login con verificación */}
            <Route exact path="/login" element={redirectToHomeIfLoggedIn()} />
            {/* Ruta de Registro con verificación */}
            <Route
              exact
              path="/signup"
              element={redirectToHomeIfLoggedInSignup()}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
