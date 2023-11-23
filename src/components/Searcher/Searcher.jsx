import { useContext, useState } from "react";
import { useMatch } from "react-router-dom";
import { AppContext } from "@context/AppContext";
import { useGetProducts } from "@hooks/useGetProducts";
import { Loading } from "@components/Loading/Loading";
import SearchItem from "@components/SearchItem/SearchItem";
import Search from "@components/Search/Search";
import { Typography } from "@mui/material";
import "./Searcher.css";

const APImen =
  "https://server-orcin-seven.vercel.app/api/product/products-for-men";
const APIwomen =
  "https://server-orcin-seven.vercel.app/api/product/products-for-women";

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
        `https://server-orcin-seven.vercel.app/api/product/product-search/${productId}`,
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
            <div className="no-coincidencia">
              <Typography variant="caption">
                No se encontraron productos para la busqueda {search}{" "}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { Searcher };
