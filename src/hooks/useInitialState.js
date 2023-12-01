import { useEffect, useState } from "react";

const initialState = {
  cart: [],
};

const API = "https://server-orcin-seven.vercel.app/api/product/products";

const useCartState = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(API);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
    const intervalId = setInterval(fetchProducts, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const storedCartState = localStorage.getItem("cartState");
  const storedSizeQuantities = localStorage.getItem("sizeQuantities");
  const initialCartState = storedCartState
    ? JSON.parse(storedCartState)
    : initialState;
  const initialSizeQuantities = storedSizeQuantities
    ? JSON.parse(storedSizeQuantities)
    : {};

  const [state, setState] = useState({
    ...initialCartState,
    products: products,
  });
  const [sizeQuantities, setSizeQuantities] = useState(initialSizeQuantities);

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (products.length > 0) {
      const newSizeQuantities = {};
      products.forEach((product) => {
        const cartItems = state.cart.filter(
          (item) => item.pdc_id === product.pdc_id
        );
        newSizeQuantities[product.pdc_id] = {
          XS:
            product.cant_xs -
            cartItems
              .filter((item) => item.size === "XS")
              .reduce((sum, item) => sum + item.quantity, 0),
          S:
            product.cant_s -
            cartItems
              .filter((item) => item.size === "S")
              .reduce((sum, item) => sum + item.quantity, 0),
          M:
            product.cant_m -
            cartItems
              .filter((item) => item.size === "M")
              .reduce((sum, item) => sum + item.quantity, 0),
          L:
            product.cant_l -
            cartItems
              .filter((item) => item.size === "L")
              .reduce((sum, item) => sum + item.quantity, 0),
          XL:
            product.cant_xl -
            cartItems
              .filter((item) => item.size === "XL")
              .reduce((sum, item) => sum + item.quantity, 0),
        };
      });
      setSizeQuantities(newSizeQuantities);
    }
  }, [products, state.cart]);

  const addToCart = (product, size, quantity) => {
    setState((prevState) => {
      const availableQuantity = sizeQuantities[product.pdc_id][size];

      if (quantity <= availableQuantity) {
        const isProductInCart = prevState.cart.some(
          (item) => item.pdc_id === product.pdc_id && item.size === size
        );

        const updatedQuantities = { ...sizeQuantities };
        updatedQuantities[product.pdc_id][size] -= quantity;
        setSizeQuantities(updatedQuantities);

        if (isProductInCart) {
          return {
            ...prevState,
            cart: prevState.cart.map((item) =>
              item.pdc_id === product.pdc_id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        } else {
          return {
            ...prevState,
            cart: [...prevState.cart, { ...product, size: size, quantity }],
          };
        }
      } else {
        return prevState;
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setState((prevState) => {
      const productInCart = prevState.cart.find(
        (item) => item.pdc_id === productId && item.size === size
      );

      if (!productInCart) {
        return prevState;
      }

      const updatedQuantities = { ...sizeQuantities };
      updatedQuantities[productId][size] += 1;
      setSizeQuantities(updatedQuantities);

      if (productInCart.quantity > 1) {
        return {
          ...prevState,
          cart: prevState.cart.map((item) =>
            item.pdc_id === productId && item.size === size
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        const updatedCart = prevState.cart.filter(
          (item) => item.pdc_id !== productId || item.size !== size
        );

        return {
          ...prevState,
          cart: updatedCart,
        };
      }
    });
  };

  const emptyCart = () => {
    setState((prevState) => {
      localStorage.removeItem("cartState");
      return {
        ...prevState,
        cart: [],
      };
    });
  };

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    sizeQuantities,
    setSizeQuantities,
    emptyCart,
  };
};

export { useCartState };
