import { useState } from "react";

const initialState = {
  cart: [],
  lastIdRemoved: -1,
};

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addToCart = (payload) => {
    setState({
      ...state,
      cart: [...state.cart, { ...payload, idCart: state.cart.length + 1 }],
    });
  };
  const removeFromCart = (payload) => {
    const fooIdx = state.cart.findIndex(({ id }) => payload.id === id);

    if (fooIdx > -1) {
      let foo = [...state.cart];
      foo.splice(fooIdx, 1);
      setState({
        ...state,
        cart: [...foo],
        lastIdRemoved: payload.id,
      });
    }
  };

  return {
    state,
    addToCart,
    removeFromCart,
  };
};

export { useInitialState };
