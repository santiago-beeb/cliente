import Typography from "@mui/material/Typography";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import "./Navbar.css";
import { useContext } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const { isLoggedIn } = useContext(AppContext);
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <nav>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          alignItems: "center",
        }}
      >
        INICIO
      </Typography>
      <div className="navbar-left">
        <a className="container_logo" href="/"></a>
        <ul>
          <li>
            <a href="/">Hombre</a>
          </li>
          <li>
            <a href="/">Mujer</a>
          </li>
        </ul>
      </div>
      {!isMobile && (
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      )}
      <div className="navbar-right">
        <ul>
          {isLoggedIn ? (
            // Si el usuario ha iniciado sesión, muestra el nombre de usuario o icono de perfil
            <a href="/perfil" className="navbar-email">
              Nombre de Usuario
            </a>
          ) : (
            // Si el usuario no ha iniciado sesión, muestra el enlace "Iniciar Sesión"
            <a href="/login" className="navbar-email">
              Iniciar Sesión
            </a>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
