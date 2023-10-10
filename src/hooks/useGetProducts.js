import { useEffect, useState } from "react";

const useGetProducts = (API, update) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(API, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al cargar los productos.");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    data();
  }, [API, update]); // Agrega 'update' a las dependencias del useEffect

  return { products, loading, error };
};

export { useGetProducts };
