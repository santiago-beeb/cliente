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
  const token = sessionStorage.getItem("token");
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
  const [severityConfirm, setSeverityConfirm] = useState("");
  const [snackbarOpenConfirm, setSnackbarOpenConfirm] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [correo, setCorreo] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { cart, addToCart, removeFromCart, emptyCart, sizeQuantities } =
    useCartState();

  const [secciones, setSecciones] = useState([]);

  // Función para obtener las marcas
  const fetchMarcas = async () => {
    try {
      const response = await fetch(
        "https://server-orcin-seven.vercel.app/api/product/marca",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener las marcas");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener las marcas", error.message);
      return [];
    }
  };

  // Función para obtener las secciones
  const fetchSecciones = async () => {
    try {
      const response = await fetch(
        "https://server-orcin-seven.vercel.app/api/product/seccion",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener las secciones");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener las secciones", error);
      return [];
    }
  };

  // Función para obtener los colores
  const fetchColores = async () => {
    try {
      const response = await fetch(
        "https://server-orcin-seven.vercel.app/api/product/color",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener los colores");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener los colores", error);
      return [];
    }
  };

  // Función para obtener los estados
  const fetchEstados = async () => {
    try {
      const response = await fetch(
        "https://server-orcin-seven.vercel.app/api/product/estado",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al obtener los estados");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener los estados", error);
      return [];
    }
  };

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
      setLoadingConfirm(true);
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
          setSeverityConfirm("warning");
          setSnackbarOpenConfirm(true);
          setLoadingConfirm(false);
          setSnackbarMessageConfirm(
            `No hay suficiente stock disponible para ${productName}`
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

      if (!addOrderResponse.ok) {
        throw new Error(`HTTP error! status: ${addOrderResponse.status}`);
      }

      setSeverityConfirm("success");
      setSnackbarOpenConfirm(true);
      setSnackbarMessageConfirm(
        "Pedido confirmado con éxito, se han enviado los detalles a su direccion de correo"
      );
      closeModalConfirm();
      emptyCart();
      emptyAddress();
      setLoadingConfirm(false);
      //goToHome();
    } catch (error) {
      console.error(error);
      setSnackbarOpenConfirm(true);
      setSeverityConfirm("error");
      setSnackbarMessageConfirm(
        "Error al confirmar el pedido. Por favor, inténtalo de nuevo.",
        error
      );
      setLoadingConfirm(false);
    }
  };

  const goToHome = () => {
    Navigate("/");
  };

  const handleSnackbarConfirmClose = () => {
    setSnackbarOpenConfirm(false);
    setSeverityConfirm("");
  };

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleAddressChange = (field, value) => {
    switch (field) {
      case "street":
        setStreet(value);
        break;
      case "number":
        setNumber(value);
        break;
      case "city":
        setCity(value);
        break;
      case "department":
        setDepartment(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      default:
        break;
    }
  };

  const isEmptyAddress = () => {
    return (
      street.trim() === "" ||
      number.trim() === "" ||
      city.trim() === "" ||
      department.trim() === "" ||
      postalCode.trim() === ""
    );
  };

  const emptyAddress = () => {
    setStreet("");
    setNumber("");
    setCity("");
    setDepartment("");
    setPostalCode("");
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
    setModalOpenConfirm(false);
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
        secciones,
        severityConfirm,
        street,
        number,
        city,
        department,
        postalCode,
        loadingConfirm,
        handleSnackbarConfirmClose,
        setSecciones,
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
        fetchMarcas,
        fetchColores,
        fetchEstados,
        fetchSecciones,
        isEmptyAddress,
        handleAddressChange,
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
