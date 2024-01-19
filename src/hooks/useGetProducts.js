import { useEffect, useState } from "react";

const useGetProducts = (
  API,
  page,
  limit,
  selectedBrand,
  selectedColor,
  update
) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(
          `${API}?page=${page}&limit=${limit}&brand=${selectedBrand}&color=${selectedColor}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al cargar los productos.");
        }
        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    data();
  }, [API, page, limit, selectedBrand, selectedColor, update]);

  return { products, total, loading, error };
};

const useGetProductsMostSearched = (API, update) => {
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
  }, [API, update]);

  return { products, loading, error };
};

export { useGetProducts, useGetProductsMostSearched };
