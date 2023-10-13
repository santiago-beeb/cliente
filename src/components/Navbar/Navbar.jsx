import { useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { AppContext } from "../../context/AppContext";
import "./Navbar.css";
import { MenuMobile } from "../MenuMobile/MenuMobile";
import { ShoppingCart } from "../../containers/ShoppingCart/ShoppingCart";
import { Searcher } from "../Searcher/Searcher";

import SearchIcon from "@mui/icons-material/Search";

const MobileNavbar = () => {
  const {
    toggleMobileMenu,
    isMenuOpen,
    closeMobileMenu,
    toggleCart,
    isCartOpen,
  } = useContext(AppContext);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className={`mobile-navbar`}>
      <div className="mobile-layout">
        <div className="mobile-icon" onClick={toggleMobileMenu}>
          <MenuIcon
            style={{
              color: "white",
              height: "35px",
              width: "35px",
            }}
          />
        </div>
        <div className="mobile-icon" onClick={closeMobileMenu}>
          <Link to="/">
            <StoreIcon
              style={{
                color: "white",
                height: "35px",
                width: "35px",
              }}
            />
          </Link>
        </div>
        {/* <Searcher onClick={closeMobileMenu} /> */}
        <div className="mobile-double">
          <SearchIcon
            onClick={toggleSearch}
            style={{
              color: "white",
              height: "30px",
              width: "30px",
            }}
          />
          <ShoppingCartIcon
            onClick={toggleCart}
            style={{
              color: "white",
              height: "30px",
              width: "35px",
            }}
          />
        </div>
      </div>
      {isMenuOpen && <MenuMobile toggleMobileMenu={toggleMobileMenu} />}
      {isCartOpen && <ShoppingCart toggleCart={toggleCart} />}
      {isSearchOpen && <Searcher toggle={toggleSearch} />}
    </nav>
  );
};

const DesktopNavbar = () => {
  const {
    isLoggedIn,
    isAdmin,
    closeCart,
    toggleCart,
    isCartOpen,
    handleLogout,
  } = useContext(AppContext);

  const isMenActive = useMatch("/men");
  const isWomenActive = useMatch("/women");
  const isAdminActive = useMatch("/administrar-productos");

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <nav>
        <div className="navbar-left">
          <Link to="/" className="container_logo" onClick={closeCart}>
            <StoreIcon
              style={{
                color: "white",
                marginLeft: "10px",
                height: "30px",
                width: "30px",
              }}
            />
          </Link>
          <ul>
            <li>
              <Link
                to="/men"
                onClick={closeCart}
                className={isMenActive ? "active-link" : ""}
              >
                Hombre
              </Link>
            </li>
            <li>
              <Link
                to="/women"
                onClick={closeCart}
                className={isWomenActive ? "active-link" : ""}
              >
                Mujer
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link
                  to="/administrar-productos"
                  onClick={closeCart}
                  className={isAdminActive ? "active-link" : ""}
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-right">
          <ul>
            <li>
              <div className="mobile-icon" onClick={toggleSearch}>
                <SearchIcon
                  style={{
                    color: "white",
                    height: "30px",
                    width: "30px",
                  }}
                />
              </div>
            </li>
            <li>
              <div className="mobile-icon" onClick={toggleCart}>
                <ShoppingCartIcon
                  style={{
                    color: "white",
                    height: "30px",
                    width: "30px",
                  }}
                />
              </div>
            </li>
            <li>
              {isLoggedIn ? (
                <a href="/login" className="mobile-icon" onClick={handleLogout}>
                  <LogoutIcon
                    style={{
                      color: "white",
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </a>
              ) : (
                <Link to="/login" className="mobile-icon" onClick={closeCart}>
                  <LoginIcon
                    style={{
                      color: "white",
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </Link>
              )}
            </li>
          </ul>
        </div>
        {isCartOpen && <ShoppingCart toggleMobileMenu={toggleCart} />}
      </nav>
      {isSearchOpen && <Searcher />}
    </>
  );
};

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return <>{isMobile ? <MobileNavbar /> : <DesktopNavbar />}</>;
};

export default Navbar;
