import { useRef, useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { AppContext } from "../../context/AppContext";
import { Helmet } from "react-helmet";
import "./Login.css";
import { Navigate } from "react-router-dom";

const url = "https://server-orcin-seven.vercel.app/api/user/login";

const Login = () => {
  const form = useRef(null);
  const { setLoggedIn, cargando, setCargando } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || contrasenia === "") {
      setError("Todos los campos son requeridos");
      return;
    }

    setCargando(true);

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
        //setAdmin(data.admin);
        sessionStorage.setItem("token", token);
        //Navigate("/");
        window.location.href = "/";
      } else {
        const data = await response.json();
        setError(data.message || "Inicio de sesión fallido");
      }
    } catch (error) {
      setError("Hubo un problema al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="Login">
      <Helmet>
        <title>Iniciar Sesion || General Shop</title>
      </Helmet>
      <div className="Login-container">
        <h1 className="title">Iniciar sesión</h1>
        <form action="" className="form" ref={form} onSubmit={handleSubmit}>
          <TextField
            required
            disabled={cargando} // Deshabilita el campo de correo si está cargando.
            type="email"
            id="email"
            label="Correo Electrónico"
            variant="standard"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            disabled={cargando} // Deshabilita el campo de contraseña si está cargando.
            id="standard-password-input"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            variant="standard"
            name="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <Button type="submit" variant="contained" disabled={cargando}>
            Iniciar Sesión
          </Button>
          {error && <p className="error-message">{error}</p>}
          <a href="/password-recovery" disabled={cargando}>
            Olvidé mi contraseña
          </a>
          <Button href="/signup" variant="outlined" disabled={cargando}>
            Registrarse
          </Button>{" "}
        </form>
      </div>
    </div>
  );
};

export { Login };
