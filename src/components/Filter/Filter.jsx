import { useState, useEffect, useContext } from "react";
import { AppContext } from "@context/AppContext";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Filter = ({ onBrandChange, onColorChange }) => {
  const { fetchMarcas, fetchColores, toggleFilters } = useContext(AppContext);
  const [marcas, setMarcas] = useState([]);
  const [colores, setColores] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Actualiza las casillas de verificación cuando cambian las selecciones
    setSelectedBrand(selectedBrand);
    setSelectedColor(selectedColor);
  }, [selectedBrand, selectedColor]);

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

  const cleanFilter = () => {
    setSelectedBrand("");
    setSelectedColor("");
    onBrandChange("");
    onColorChange("");
  };

  return (
    <div className="filter-options">
      <div className="box">
        <div className="filter-clean" onClick={cleanFilter}>
          <p>Limpiar filtros</p>
        </div>
        <div className="icon-close-filter">
          <CloseIcon onClick={toggleFilters} />
        </div>
      </div>
      <FormLabel component="legend">Marca</FormLabel>
      <FormGroup>
        {marcas.map((marca) => (
          <FormControlLabel
            key={marca.mar_id}
            control={
              <Checkbox
                key={selectedBrand}
                checked={selectedBrand === marca.mar_nombre}
                onChange={handleBrandChange}
                value={marca.mar_nombre}
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
                key={selectedColor}
                checked={selectedColor === color.col_nombre}
                onChange={handleColorChange}
                value={color.col_nombre}
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
