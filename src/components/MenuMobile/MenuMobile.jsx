import { useContext, useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { AppContext } from "@context/AppContext";
import CloseIcon from "@mui/icons-material/Close";
import "./MenuMobile.css";

const MenuMobile = () => {
  const {
    isLoggedIn,
    isAdmin,
    nombre,
    handleLinkClick,
    handleLogout,
    isMenuOpen,
    closeMobileMenu,
  } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isMenuOpen);
  }, [isMenuOpen]);

  const isMenActive = useMatch("/men");
  const isWomenActive = useMatch("/women");
  const isOrderActive = useMatch("/orders");
  const isAdminActive = useMatch("/administrar-productos");
  const isLoginActive = useMatch("/login");

  return (
    <div className={`mobile-menu ${isOpen ? "menu-open" : ""}`}>
      <CloseIcon className="close-icon" onClick={() => closeMobileMenu()} />
      <ul className="first-ul">
        <li onClick={handleLinkClick}>
          <Link
            to="/men"
            className={`mobile-menu-link ${
              isMenActive ? "mobile-active-link" : ""
            }`}
          >
            Hombre
          </Link>
        </li>
        <li onClick={handleLinkClick}>
          <Link
            to="/women"
            className={`mobile-menu-link ${
              isWomenActive ? "mobile-active-link" : ""
            }`}
          >
            Mujer
          </Link>
        </li>
        {isLoggedIn && (
          <li onClick={handleLinkClick}>
            <Link
              to="/orders"
              className={`mobile-menu-link ${
                isOrderActive ? "mobile-active-link" : ""
              }`}
            >
              Ordenes
            </Link>
          </li>
        )}
        {isAdmin && (
          <li onClick={handleLinkClick} className="smaller-font">
            <Link
              to="/administrar-productos"
              className={`mobile-menu-link ${
                isAdminActive ? "mobile-active-link" : ""
              }`}
            >
              Admin
            </Link>
          </li>
        )}
      </ul>
      <ul>
        <li>
          {isLoggedIn ? (
            <p className="mobile-menu-text smaller-font">Bienvenido {nombre}</p>
          ) : (
            <p className="mobile-menu-text"></p>
          )}
        </li>
        <li>
          {isLoggedIn ? (
            <a
              href="/login"
              className="navbar-email mobile-menu-link smaller-font"
              onClick={() => {
                handleLogout();
              }}
            >
              Cerrar Sesión
            </a>
          ) : (
            <Link
              to="/login"
              className={`navbar-email mobile-menu-link smaller-font ${
                isLoginActive ? "mobile-active-link" : ""
              }`}
              onClick={() => {
                handleLinkClick();
              }}
            >
              Iniciar Sesión
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export { MenuMobile };
