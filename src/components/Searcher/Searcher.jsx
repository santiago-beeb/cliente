import { useContext, useState } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { useMatch } from "react-router-dom";
import { Typography } from "@mui/material";
import { Loading } from "../Loading/Loading";
import SearchItem from "../SearchItem/SearchItem";
import Search from "../Search/Search";
import "./Searcher.css";
import { AppContext } from "../../context/AppContext";

const APImen =
  "https://server-general.up.railway.app/api/product/products-for-men";
const APIwomen =
  "https://server-general.up.railway.app/api/product/products-for-women";

const Searcher = () => {
  const isWomenActive = useMatch("/women");
  const { toggleSearch } = useContext(AppContext);
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

  const inputValue = (e) => setSearch(e.target.value);

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

  const handleClick = async (productId) => {
    try {
      await fetch(
        `https://server-general.up.railway.app/api/product/product-search/${productId}`,
        { method: "POST" }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-search">
        <div className="search-modal">
          <Search
            search={search}
            inputValue={inputValue}
            toggleSearch={toggleSearch}
          />
        </div>
        <div className="product-list">
          {results.length > 0 ? (
            results.map((product) => (
              <SearchItem
                handleClick={() => handleClick(product.pdc_id)}
                product={product}
                key={product.pdc_id}
              />
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
