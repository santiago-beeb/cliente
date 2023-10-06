import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import "./Login.css";

const url = "https://server-general.up.railway.app/api/user/login";

const Login = () => {
  const navigate = useNavigate();
  const form = useRef(null);
  const { setLoggedIn } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || contrasenia === "") {
      setError("Todos los campos son requeridos");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usr_email: email,
          usr_contrasenia: contrasenia,
        }),
      });

      if (response.ok) {
        setError("");
        setLoggedIn(true);
        const data = await response.json();
        const token = data.token;
        sessionStorage.setItem("token", token);
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || "Inicio de sesión fallido");
      }
    } catch (error) {
      setError("Hubo un problema al iniciar sesión");
    }
  };
  return (
    <div className="Login">
      <div className="Login-container">
        <h1 className="title">Iniciar sesión</h1>
        <form action="" className="form" ref={form} onSubmit={handleSubmit}>
          <TextField
            required
            type="email"
            id="email"
            label="Correo Electrónico"
            variant="standard"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="standard-password-input"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            variant="standard"
            name="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Iniciar Sesión
          </Button>
          {error && <p className="error-message">{error}</p>}
          <a href="/password-recovery">Olvidé mi contraseña</a>
          <Button href="/signup" variant="outlined">
            Registrarse
          </Button>{" "}
        </form>
      </div>
    </div>
  );
};

export { Login };
