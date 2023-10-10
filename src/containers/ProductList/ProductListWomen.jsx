import { Loading } from "../../components/Loading/Loading";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { useGetProducts } from "../../hooks/useGetProducts";
import "./ProductList.css"

const API =
  "https://server-general.up.railway.app/api/product/products-for-women";

const ProductListWomen = () => {
  const { products, loading, error } = useGetProducts(API);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

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
export { ProductListWomen };
