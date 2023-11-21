import { Helmet } from "react-helmet";
import { ProductListMen } from "@containers/ProductList/ProductListMen";

const Men = () => {
  return (
    <>
      <Helmet>
        <title>Hombre || General Shop</title>
      </Helmet>
      <ProductListMen />
    </>
  );
};

export default Men;
