import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AppContext = createContext();

const isUserAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  return Boolean(token);
};

function AppProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(isUserAuthenticated);
  const [isAdmin, setAdmin] = useState(false);
  const [nombre, setNombre] = useState("");
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const url =
      "https://server-general.up.railway.app/api/user/check-admin-role";

    const requestOptions = {
      method: "GET",
      headers: {
        token: `${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No tienes autorizacion");
        }
        return response.json();
      })
      .then((data) => {
        setAdmin(data.isAdmin);
        setNombre(data.nombre);
      })
      .catch((error) => {
        console.error("Error al verificar el estado de administrador:", error);
      });
  }, [isLoggedIn]);

  const checkTokenValidity = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return;
    }

    const url =
      "https://server-general.up.railway.app/api/user/check-admin-role";

    const requestOptions = {
      method: "GET",
      headers: {
        token: `${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            sessionStorage.removeItem("token");
            setLoggedIn(false);
            setAdmin(false);
            setNombre("");
            Navigate("/login");
          } else {
            throw new Error(`Solicitud fallida con código: ${response.status}`);
          }
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error al verificar el estado del token:", error);
      });
  };

  useEffect(() => {
    checkTokenValidity();
    const tokenCheckInterval = setInterval(() => {
      checkTokenValidity();
    }, 60000);
    return () => clearInterval(tokenCheckInterval);
  }, []);

  const toggleMobileMenu = () => {
    setMenuOpen(!isMenuOpen);
    setCartOpen(false);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setCartOpen(false);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
    setMenuOpen(false);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
    toggleMobileMenu();
    setAdmin(false);
    setNombre("");
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    toggleMobileMenu();
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        isCartOpen,
        isAdmin,
        nombre,
        isMenuOpen,
        cargando,
        setCargando,
        setCartOpen,
        setLoggedIn,
        toggleCart,
        closeCart,
        setAdmin,
        setNombre,
        toggleMobileMenu,
        closeMobileMenu,
        handleLogout,
        handleLinkClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
