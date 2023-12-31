import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = ({ search, inputValue, toggleSearch }) => {
  const Search = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
      width: "100%",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
  }));

  const CloseIconWrapper = styled("div")(({ theme }) => ({
    position: "absolute",
    right: theme.spacing(2),
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(1),
      right: theme.spacing(1),
    },
  }));

  return (
    <Search>
      <SearchIcon />
      <StyledInputBase
        autoFocus
        value={search}
        onChange={inputValue}
        placeholder="Buscar..."
      />
      <CloseIconWrapper onClick={toggleSearch}>
        <CloseIcon />
      </CloseIconWrapper>
    </Search>
  );
};

export default Search;
