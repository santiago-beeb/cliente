import { useState, useContext } from "react";
import { useGetProducts } from "@hooks/useGetProducts";
import { AppContext } from "@context/AppContext";
import { Loading } from "@components/Loading/Loading";
import ProductItem from "@components/ProductItem/ProductItem";
import { Filter } from "@components/Filter/Filter";
import TuneIcon from "@mui/icons-material/Tune";
import Pagination from "@mui/material/Pagination";
import "./ProductList.css";

const API =
  "https://server-orcin-seven.vercel.app/api/product/products-for-men";
//const API = "http://localhost:3001/api/product/products-for-men";

const ProductListMen = () => {
  const [page, setPage] = useState(1);
  const limit = 9;
  const { toggleFilters, filtersVisible } = useContext(AppContext);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const { products, total, loading, error } = useGetProducts(
    API,
    page,
    limit,
    selectedBrand,
    selectedColor
  );
  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  return (
    <>
      <section className="main-container">
        <div className="filter-box">
          <div className="icon-filter" onClick={toggleFilters}>
            <TuneIcon /> <p>Filtros</p>
          </div>
        </div>
        <div className={`filter-container ${filtersVisible ? "visible" : ""}`}>
          <Filter
            onBrandChange={setSelectedBrand}
            onColorChange={setSelectedColor}
          />
        </div>
        <div className="ProductList">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductItem key={product.pdc_id} product={product} />
            ))
          ) : (
            <p>No se encontraron productos con los filtros seleccionados.</p>
          )}
        </div>
      </section>
      <Pagination
        className="pagination"
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </>
  );
};

export { ProductListMen };
