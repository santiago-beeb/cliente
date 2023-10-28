import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ActivateUser = () => {
  const { userId } = useParams();
  const [activationStatus, setActivationStatus] = useState("activating");
  const [activationMessage, setActivationMessage] = useState("");
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    fetch(`https://server-orcin-seven.vercel.app/api/user/active/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          // Activación exitosa, redirige al usuario al login
          setActivationStatus("success");
          setActivationMessage(
            "Tu usuario ha sido activado con éxito. Redirigiendo al inicio de sesión..."
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          // Error en la activación, muestra el mensaje de error
          const data = await response.json();
          setActivationStatus("error");
          setActivationMessage(
            data.message || "Ha ocurrido un error al activar tu usuario."
          );
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud: " + error);
        setActivationStatus("error");
        setActivationMessage("Ha ocurrido un error en la solicitud.");
      });
  }, [userId, navigate]);

  return (
    <>
      <Helmet>
        <title>Activar Usuario || General Shop</title>
      </Helmet>
      <div className="vertical-center">
        <div className="container">
          <div className="text-center">
            {activationStatus === "success" ? (
              <>
                <h1>😄</h1>
                <h2>{activationMessage}</h2>
              </>
            ) : activationStatus === "error" ? (
              <>
                <h1>😕</h1>
                <h2>{activationMessage}</h2>
              </>
            ) : (
              <>
                <h1>😮</h1>
                <h2>Estamos activando tu usuario...</h2>
                <p>{activationMessage}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { ActivateUser };
