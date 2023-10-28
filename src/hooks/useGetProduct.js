import { useEffect, useState } from "react";

const useGetProduct = (productId) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch(
          `https://server-orcin-seven.vercel.app/api/product/product/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error el producto.");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    data();
  }, [productId]);

  return { product, loading, error };
};

export { useGetProduct };
