import { Helmet } from "react-helmet";
import { ProductListWomen } from "@containers/ProductList/ProductListWomen";

const Women = () => {
  return (
    <>
      <Helmet>
        <title>Mujer || General Shop</title>
      </Helmet>
      <ProductListWomen />
    </>
  );
};

export default Women;
