import { useContext, useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import { useGetProducts } from "../../hooks/useGetProducts";
import ProductItem from "../../components/ProductItem/ProductItem";
import { Filter } from "../../components/Filter/Filter";
import TuneIcon from "@mui/icons-material/Tune";
import { AppContext } from "../../context/AppContext";
import "./ProductList.css";

const API =
  "https://server-orcin-seven.vercel.app/api/product/products-for-women";

const ProductListWomen = () => {
  const { toggleFilters, filtersVisible } = useContext(AppContext);
  const { products, loading, error } = useGetProducts(API);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        (!selectedBrand || product.pdc_fk_marca === selectedBrand) &&
        (!selectedColor || product.pdc_fk_color === selectedColor)
      );
    });

    setFilteredProducts(filtered);
  }, [selectedBrand, selectedColor, products]);

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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem key={product.pdc_id} product={product} />
            ))
          ) : (
            <p>No se encontraron productos con los filtros seleccionados.</p>
          )}
        </div>
      </section>
    </>
  );
};

export { ProductListWomen };
