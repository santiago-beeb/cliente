import { useState, createContext, useEffect } from "react";
import { useCartState } from "../hooks/useInitialState";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const AppContext = createContext();

const isUserAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  return Boolean(token);
};

function AppProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(isUserAuthenticated);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenConfirm, setModalOpenConfirm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [id, setId] = useState("");
  const [snackbarMessageConfirm, setSnackbarMessageConfirm] = useState("");
  const [snackbarOpenConfirm, setSnackbarOpenConfirm] = useState(false);
  const [correo, setCorreo] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { cart, addToCart, removeFromCart, emptyCart, sizeQuantities } =
    useCartState();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const url =
      "https://server-orcin-seven.vercel.app/api/user/check-admin-role";

    const requestOptions = {
      method: "GET",
      headers: {
        token: `${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No tienes autorizacion");
        }
        return response.json();
      })
      .then((data) => {
        setId(data.id);
        setAdmin(data.isAdmin);
        setNombre(data.nombre);
        setCorreo(data.correo);
      })
      .catch((error) => {
        console.error("Error al verificar el estado de administrador:", error);
      });
  }, [isLoggedIn]);

  const checkTokenValidity = () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return;
    }

    const url =
      "https://server-orcin-seven.vercel.app/api/user/check-admin-role";

    const requestOptions = {
      method: "GET",
      headers: {
        token: `${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            sessionStorage.removeItem("token");
            setLoggedIn(false);
            setAdmin(false);
            setNombre("");
            setCorreo("");
            Navigate("/login");
          } else {
            throw new Error(`Solicitud fallida con código: ${response.status}`);
          }
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error al verificar el estado del token:", error);
      });
  };

  useEffect(() => {
    checkTokenValidity();
    const tokenCheckInterval = setInterval(() => {
      checkTokenValidity();
    }, 3600000);
    return () => clearInterval(tokenCheckInterval);
  }, []);

  const confirmOrder = async (order) => {
    try {
      const sizeEditURL = `https://server-orcin-seven.vercel.app/api/product/update-sizes`;

      const sizeEditData = { sizeUpdates: order.sizeUpdates };

      const sizeEditResponse = await fetch(sizeEditURL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sizeEditData),
      });

      if (sizeEditResponse.status !== 200) {
        setSnackbarOpenConfirm(true);
        setSnackbarMessageConfirm("Error al eliminar las tallas");
        return;
      }

      const sizeEditResult = await sizeEditResponse.json();

      if (sizeEditResult.message === "Cantidad sin stock") {
        const productIdWithoutStock = sizeEditResult.productId;
        const productName = cart.find(
          (item) => item.pdc_id === productIdWithoutStock
        )?.pdc_descripcion;
        if (productName) {
          setSnackbarOpenConfirm(true);
          setSnackbarMessageConfirm(
            `No hay suficiente stock disponible para el producto: ${productName}`
          );
        }
        return;
      }

      // Luego, crea una orden utilizando los datos del carrito
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];

      const orderData = {
        ord_fecha_compra: formattedDate,
        ord_valor_total: order.total,
        ord_fk_usuario: order.usr_id,
        ord_direccion: order.deliveryAddress,
        productos: cart,
        userEmail: order.userEmail,
      };

      const addOrderURL =
        "https://server-orcin-seven.vercel.app/api/product/order";

      const addOrderResponse = await fetch(addOrderURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (addOrderResponse.status !== 200) {
        setSnackbarMessageConfirm("Error al agregar la orden");
        setSnackbarOpenConfirm(true);
        return;
      }

      setSnackbarOpenConfirm(true);
      setSnackbarMessageConfirm(
        "Pedido confirmado con éxito, redirigiendo al inicio"
      );
      closeModalConfirm();
      emptyCart();
      goToHome();
    } catch (error) {
      setSnackbarMessageConfirm(
        "Error al confirmar el pedido. Por favor, inténtalo de nuevo.",
        error
      );
      setSnackbarOpenConfirm(true);
    }
  };

  const goToHome = () => {
    Navigate("/");
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!isMenuOpen);
    setCartOpen(false);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setCartOpen(false);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
    setMenuOpen(false);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModalConfirm = () => {
    setSnackbarOpenConfirm(false);
    setSnackbarMessageConfirm("");
    setModalOpenConfirm(true);
  };

  const closeModalConfirm = () => {
    setTimeout(() => {
      setModalOpenConfirm(false);
    }, 3000);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
    toggleMobileMenu();
    setAdmin(false);
    setNombre("");
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    toggleMobileMenu();
  };

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductInfoOpen, setProductInfoOpen] = useState(false);
  const [productInfoMessage, setProductInfoMessage] = useState("");
  const [productInfoSeverity, setProductInfoSeverity] = useState("");

  const openProductInfo = (product) => {
    setSelectedProduct(product);
    setProductInfoOpen(true);
  };

  const closeProductInfo = () => {
    setProductInfoOpen(false);
  };

  const handleProductInfoSnackbarClose = () => {
    setProductInfoOpen(false);
    setProductInfoSeverity("");
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        isCartOpen,
        isAdmin,
        nombre,
        isMenuOpen,
        isSearchOpen,
        cargando,
        modalOpen,
        cart,
        selectedProduct,
        isProductInfoOpen,
        productInfoMessage,
        productInfoSeverity,
        selectedSize,
        sizeQuantities,
        correo,
        id,
        snackbarMessageConfirm,
        snackbarOpenConfirm,
        modalOpenConfirm,
        confirmOrder,
        setCorreo,
        setSelectedSize,
        setProductInfoMessage,
        addToCart,
        removeFromCart,
        openProductInfo,
        closeProductInfo,
        handleProductInfoSnackbarClose,
        setCargando,
        setCartOpen,
        setLoggedIn,
        toggleCart,
        closeCart,
        setAdmin,
        setNombre,
        toggleMobileMenu,
        closeMobileMenu,
        handleLogout,
        handleLinkClick,
        setIsSearchOpen,
        toggleSearch,
        openModal,
        closeModal,
        closeModalConfirm,
        openModalConfirm,
        goToHome,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
