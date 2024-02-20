import { useContext, useState } from "react";
import { useMatch } from "react-router-dom";
import { AppContext } from "@context/AppContext";
import { useGetProducts } from "@hooks/useGetProducts";
import { Loading } from "@components/Loading/Loading";
import SearchItem from "@components/SearchItem/SearchItem";
import Search from "@components/Search/Search";
import { Typography } from "@mui/material";
import "./Searcher.css";
import { useGetProductsSearcher } from "../../hooks/useGetProducts";

const APImen = import.meta.env.VITE_URL_MEN;
const APIwomen = import.meta.env.VITE_URL_WOMEN;

const Searcher = () => {
  const isWomenActive = useMatch("/women");
  const { toggleSearch } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { products, loading, error } = useGetProducts(
    isWomenActive ? APIwomen : APImen,
    page,
    limit,
    selectedBrand,
    selectedColor
  );
  const { productsSearcher } = useGetProductsSearcher(
    isWomenActive ? APIwomen : APImen,
    page,
    0,
    selectedBrand,
    selectedColor
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
    results = productsSearcher.filter(
      (product) =>
        product.pdc_descripcion.toLowerCase().includes(search.toLowerCase()) ||
        product.pdc_fk_color.toLowerCase().includes(search.toLowerCase()) ||
        product.pdc_fk_marca.toLowerCase().includes(search.toLowerCase())
    );
  }

  const handleClick = async (productId) => {
    try {
      await fetch(`${import.meta.env.VITE_URL_PRODUCT_SEARCHER}${productId}`, {
        method: "POST",
      });
    } catch (error) {
      0;
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
