import { Loading } from "../../components/Loading/Loading";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useGetProducts } from "../../hooks/useGetProducts";
import "./ProductList.css";

const API = "https://server-orcin-seven.vercel.app/api/product/most-searcher";

const MostSearched = () => {
  const { products, loading, error } = useGetProducts(API);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  return (
    <section className="main-container-most-searcher">
      <div className="list-most-searcher">
        {products.map((product) => (
          <ProductItem product={product} key={product.pdc_id} />
        ))}
      </div>
    </section>
  );
};

export { MostSearched };
