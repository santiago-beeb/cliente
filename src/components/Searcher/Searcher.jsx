import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";

const Searcher = () => {
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
    height: "40px",
    marginTop: "10px",
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
    width: "100%",
    height: "100%",
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

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Usamos useEffect para manejar la lógica de búsqueda
  // Esto se ejecutará después de que el componente se haya vuelto a renderizar
  useEffect(() => {
    // Aquí puedes agregar la lógica para buscar en tus productos
    // Por ejemplo:
    // let resultados = buscarProductos(searchText);
    // setSearchResults(resultados);
  }, [searchText]);

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Buscar..."
          inputProps={{ "aria-label": "search" }}
          value={searchText}
          onChange={handleSearchChange} // Agrega esta línea
        />
      </Search>
    </>
  );
};

export { Searcher };
