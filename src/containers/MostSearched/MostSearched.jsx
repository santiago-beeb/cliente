import { ProductItem } from "../../components/ProductItem/ProductItem";
import { useGetProducts } from "../../hooks/useGetProducts";
import "./ProductList.css";

const API =
  "https://server-general.up.railway.app/api/product/products-for-men";

const MostSearched = () => {
  const { products } = useGetProducts(API);

  return (
    <section className="main-container">
      <div className="ProductList">
        {products.map((product) => (
          <ProductItem product={product} key={product.pdc_id} />
        ))}
      </div>
    </section>
  );
};

export { MostSearched };
