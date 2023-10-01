import { useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "../../context/AppContext";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.css";
import { MenuMobile } from "../MenuMobile/MenuMobile";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "500px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%", // Ancho completo del contenedor
  height: "100%", // Altura completa del contenedor
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
  },
}));

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`mobile-navbar ${isMenuOpen ? "menu-open" : ""}`}>
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
        <div className="mobile-icon">
          <LocalMallIcon
            style={{
              color: "white",
              height: "35px",
              width: "35px",
            }}
          />
        </div>
      </div>
      {isMenuOpen && <MenuMobile toggleMobileMenu={toggleMobileMenu} />}
    </nav>
  );
};

const DesktopNavbar = () => {
  const { isLoggedIn, setLoggedIn } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <nav>
      <div className="navbar-left">
        <Link to="/" className="container_logo">
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
            <Link to="/hombre">Hombre</Link>
          </li>
          <li>
            <Link to="/mujer">Mujer</Link>
          </li>
        </ul>
      </div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <div className="navbar-right">
        <ul>
          <li>
            <LocalMallIcon
              style={{
                color: "white",
                marginRight: "10px",
                height: "30px",
                width: "30px",
              }}
            />
          </li>
          <li>
            {isLoggedIn ? (
              <Link to="/" className="navbar-email" onClick={handleLogout}>
                Cerrar Sesión
              </Link>
            ) : (
              <Link to="/login" className="navbar-email">
                Iniciar Sesión
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return <>{isMobile ? <MobileNavbar /> : <DesktopNavbar />}</>;
};

export default Navbar;
