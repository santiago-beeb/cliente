import { useEffect, useState } from "react";
import { useGetProducts } from "./useGetProducts";

const initialState = {
  cart: [],
};

const API = "https://server-general.up.railway.app/api/product/products";

const useCartState = () => {
  const { products: initialProducts } = useGetProducts(API);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [state, setState] = useState({
    ...initialState,
    products: initialProducts,
  });
  useEffect(() => {
    const newSizeQuantities = {};
    initialProducts.forEach((product) => {
      newSizeQuantities[product.pdc_id] = {
        XS: product.cant_xs,
        S: product.cant_s,
        M: product.cant_m,
        L: product.cant_l,
        XL: product.cant_xl,
      };
    });
    setSizeQuantities(newSizeQuantities);
  }, [initialProducts]);

  const addToCart = (product, size, quantity) => {
    setState((prevState) => {
      const isProductInCart = prevState.cart.some(
        (item) => item.pdc_id === product.pdc_id && item.size === size
      );

      if (isProductInCart) {
        return {
          ...prevState,
          cart: prevState.cart.map((item) =>
            item.pdc_id === product.pdc_id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Si el producto no está en el carrito o tiene una talla diferente, agrega uno nuevo
        return {
          ...prevState,
          cart: [...prevState.cart, { ...product, size: size, quantity: 1 }],
        };
      }
    });

    // Disminuye la cantidad en sizeQuantities
    setSizeQuantities((prevQuantities) => {
      // Verifica si prevQuantities[product.pdc_id] existe
      if (!prevQuantities[product.pdc_id]) {
        // Si no existe, crea un nuevo objeto con las cantidades iniciales para cada talla
        prevQuantities[product.pdc_id] = {
          XS: product.cant_xs,
          S: product.cant_s,
          M: product.cant_m,
          L: product.cant_l,
          XL: product.cant_xl,
        };
      }

      // Verifica si la cantidad del producto es mayor que 0 antes de disminuirlo
      if (prevQuantities[product.pdc_id][size] > 0) {
        return {
          ...prevQuantities,
          [product.pdc_id]: {
            ...prevQuantities[product.pdc_id],
            [size]: prevQuantities[product.pdc_id][size] - quantity,
          },
        };
      } else {
        // Si la cantidad del producto es 0 o menor, no la disminuyas
        return prevQuantities;
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setState((prevState) => {
      const productInCart = prevState.cart.find(
        (item) => item.pdc_id === productId && item.size === size
      );

      if (!productInCart) {
        // Si el producto no está en el carrito, no hagas nada
        return prevState;
      }

      if (productInCart.quantity > 1) {
        // Si hay más de una unidad del producto en el carrito, disminuye la cantidad
        return {
          ...prevState,
          cart: prevState.cart.map((item) =>
            item.pdc_id === productId && item.size === size
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        // Si solo hay una unidad del producto en el carrito, elimina el producto
        const updatedCart = prevState.cart.filter(
          (item) => item.pdc_id !== productId || item.size !== size
        );

        return {
          ...prevState,
          cart: updatedCart,
        };
      }
    });

    // Aumenta la cantidad en sizeQuantities
    setSizeQuantities((prevQuantities) => {
      return {
        ...prevQuantities,
        [productId]: {
          ...prevQuantities[productId],
          [size]: prevQuantities[productId][size] + 1,
        },
      };
    });
  };

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    sizeQuantities,
    setSizeQuantities,
  };
};

export { useCartState };
