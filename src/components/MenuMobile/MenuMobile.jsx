import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import "./MenuMobile.css";

const MenuMobile = () => {
  const { isLoggedIn, isAdmin, nombre, handleLinkClick, handleLogout, isMenuOpen } =
    useContext(AppContext);

  return (
    <div className={`mobile-menu ${isMenuOpen ? "menu-open" : ""}`}>
      <ul>
        <li onClick={handleLinkClick}>
          <Link to="/hombre" className="mobile-menu-link">
            Hombre
          </Link>
        </li>
        <li onClick={handleLinkClick}>
          <Link to="/mujer" className="mobile-menu-link">
            Mujer
          </Link>
        </li>
        {isAdmin && (
          <li onClick={handleLinkClick} className="smaller-font">
            <Link to="/administrar-productos">Administrar Productos</Link>
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
            <Link
              to="/"
              className="navbar-email mobile-menu-link smaller-font"
              onClick={() => {
                handleLogout();
              }}
            >
              Cerrar Sesión
            </Link>
          ) : (
            <Link
              to="/login"
              className="navbar-email mobile-menu-link smaller-font"
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
