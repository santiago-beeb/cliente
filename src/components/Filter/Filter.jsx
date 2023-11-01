import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./Filter.css";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

const Filter = ({ onBrandChange, onColorChange }) => {
  const { fetchMarcas, fetchColores } = useContext(AppContext);
  const [marcas, setMarcas] = useState([]);
  const [colores, setColores] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const marcasData = await fetchMarcas();
    setMarcas(marcasData);

    const coloresData = await fetchColores();
    setColores(coloresData);
  };

  const handleBrandChange = (e) => {
    if (e.target.checked) {
      setSelectedBrand(e.target.value);
      onBrandChange(e.target.value);
    } else {
      setSelectedBrand("");
      onBrandChange("");
    }
  };

  const handleColorChange = (e) => {
    if (e.target.checked) {
      setSelectedColor(e.target.value);
      onColorChange(e.target.value);
    } else {
      setSelectedColor("");
      onColorChange("");
    }
  };

  return (
    <div className="filter-options">
      <FormLabel component="legend">Marca</FormLabel>
      <FormGroup>
        {marcas.map((marca) => (
          <FormControlLabel
            key={marca.mar_id}
            control={
              <Checkbox
                id={marca.mar_nombre}
                name={marca.mar_nombre}
                value={marca.mar_nombre}
                onChange={handleBrandChange}
              />
            }
            label={marca.mar_nombre}
          />
        ))}
      </FormGroup>

      <FormLabel component="legend">Color</FormLabel>
      <FormGroup>
        {colores.map((color) => (
          <FormControlLabel
            key={color.col_id}
            control={
              <Checkbox
                id={color.col_nombre}
                name={color.col_nombre}
                value={color.col_nombre}
                onChange={handleColorChange}
              />
            }
            label={color.col_nombre}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export { Filter };
