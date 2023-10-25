import { useState } from "react";

const initialState = {
  cart: [],
};

const useCartState = () => {
  const [state, setState] = useState(initialState);

  const addToCart = (product) => {
    setState((prevState) => {
      const isProductInCart = prevState.cart.some(
        (item) => item.pdc_id === product.pdc_id
      );

      if (isProductInCart) {
        // Si el producto ya está en el carrito, actualiza la cantidad en lugar de agregar uno nuevo
        return {
          ...prevState,
          cart: prevState.cart.map((item) =>
            item.pdc_id === product.pdc_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Si el producto no está en el carrito, agrega uno nuevo
        return {
          ...prevState,
          cart: [...prevState.cart, { ...product, quantity: 1 }],
        };
      }
    });
  };

  const removeFromCart = (productId) => {
    setState((prevState) => {
      const updatedCart = prevState.cart.filter(
        (product) => product.pdc_id !== productId
      );
      return {
        ...prevState,
        cart: updatedCart,
      };
    });
  };

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
  };
};

export { useCartState };
