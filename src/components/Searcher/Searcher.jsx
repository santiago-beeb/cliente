import { useState } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { useMatch } from "react-router-dom";
import { ProductItem } from "../ProductItem/ProductItem";
import { TextField, Typography } from "@mui/material";
import { Loading } from "../Loading/Loading";
import CloseIcon from "@mui/icons-material/Close";
import "./Searcher.css"; // Asegúrate de tener un archivo CSS con estilos adecuados

const APImen =
  "https://server-general.up.railway.app/api/product/products-for-men";
const APIwomen =
  "https://server-general.up.railway.app/api/product/products-for-women";

const Searcher = () => {
  const isWomenActive = useMatch("/women");
  const [search, setSearch] = useState("");
  const { products, loading, error } = useGetProducts(
    isWomenActive ? APIwomen : APImen
  );
  let results = [];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error al cargar : {error.message}</p>;
  }

  if (!search) {
    results = products;
  } else {
    results = products.filter(
      (product) =>
        product.pdc_descripcion.toLowerCase().includes(search.toLowerCase()) ||
        product.pdc_fk_color.toLowerCase().includes(search.toLowerCase()) ||
        product.pdc_fk_marca.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <div className="container-search">
        <div className="search-modal">
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Buscar productos"
            type="search"
            fullWidth
            variant="standard"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="product-list">
          {results.length > 0 ? (
            results.map((product) => (
              <ProductItem product={product} key={product.pdc_id} />
            ))
          ) : (
            <Typography variant="caption">
              No se encontraron productos para la busqueda {search}{" "}
            </Typography>
          )}
        </div>
      </div>
    </>
  );
};

export { Searcher };
