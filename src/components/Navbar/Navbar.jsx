import { useContext } from "react";
import { Link, useMatch } from "react-router-dom";
import { Badge, useMediaQuery } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "@context/AppContext";
import { MenuMobile } from "@components/MenuMobile/MenuMobile";
import { ShoppingCart } from "@containers/ShoppingCart/ShoppingCart";
import { Searcher } from "@components/Searcher/Searcher";
import "./Navbar.css";

const MobileNavbar = () => {
  const {
    toggleMobileMenu,
    isMenuOpen,
    closeMobileMenu,
    toggleCart,
    isCartOpen,
    cart,
    visible,
    isSearchOpen,
    toggleSearch,
  } = useContext(AppContext);

  return (
    <nav
      className={`mobile-navbar ${
        visible ? "navbar-visible" : "navbar-hidden"
      }`}
    >
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
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon
              onClick={toggleCart}
              style={{
                color: "white",
                height: "30px",
                width: "35px",
              }}
            />
          </Badge>
        </div>
      </div>
      {isMenuOpen && <MenuMobile />}
      {isCartOpen && <ShoppingCart />}
      {isSearchOpen && <Searcher />}
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
    cart,
    handleLogout,
    isSearchOpen,
    toggleSearch,
    visible,
  } = useContext(AppContext);

  const isMenActive = useMatch("/men");
  const isWomenActive = useMatch("/women");
  const isAdminActive = useMatch("/administrar-productos");
  const isOrderActive = useMatch("/orders");

  return (
    <>
      <nav className={visible ? "navbar-visible" : "navbar-hidden"}>
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
            {isLoggedIn && (
              <li>
                <Link
                  to="/orders"
                  onClick={closeCart}
                  className={isOrderActive ? "active-link" : ""}
                >
                  Ordenes
                </Link>
              </li>
            )}
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
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon
                    style={{
                      color: "white",
                      height: "30px",
                      width: "30px",
                    }}
                  />
                </Badge>
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
        {isCartOpen && <ShoppingCart />}
      </nav>
      {isSearchOpen && <Searcher />}
    </>
  );
};

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const ScrollableNavbar = isMobile ? MobileNavbar : DesktopNavbar;

  return <ScrollableNavbar />;
};

export default Navbar;
