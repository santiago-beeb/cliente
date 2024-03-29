import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Alert, Button, MenuItem, Snackbar, TextField } from "@mui/material";
import { AppContext } from "@context/AppContext";
import CryptoJS from "crypto-js";
import "./CreateAccount.css";

const url = import.meta.env.VITE_URL_SIGNUP;
const documentTypesUrl =
  "https://server-orcin-seven.vercel.app/api/user/document-types";

const CreateAccount = () => {
  const navigate = useNavigate();

  const { cargando, setCargando } = useContext(AppContext);

  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [repetirContrasenia, setRepetirContrasenia] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([]);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,20}$/;
    return passwordRegex.test(password);
  };

  const emptyData = () => {
    setTipoDocumento("");
    setNumeroDocumento("");
    setNombre("");
    setApellido("");
    setEmail("");
    setContrasenia("");
    setRepetirContrasenia("");
  };

  // Efecto para obtener los tipos de documento desde la API
  useEffect(() => {
    async function fetchDocumentTypes() {
      try {
        const response = await fetch(documentTypesUrl);
        if (response.ok) {
          const data = await response.json();
          setDocumentTypes(data);
        }
      } catch (error) {
        console.error("Error al obtener tipos de documento:", error);
      }
    }

    fetchDocumentTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCargando(true);

    if (contrasenia !== repetirContrasenia) {
      setError("Las contraseñas no coinciden.");
      setCargando(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("El correo electrónico no es válido.");
      setCargando(false);
      return;
    }

    if (!validatePassword(contrasenia)) {
      setError(
        "La contraseña debe tener entre 5 y 20 caracteres, incluyendo al menos una mayúscula, una minúscula y un número."
      );
      setCargando(false);
      return;
    }

    const hashedPassword = CryptoJS.AES.encrypt(
      contrasenia,
      import.meta.env.VITE_KEY
    ).toString();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usr_tipo_documento: tipoDocumento,
          usr_numero_documento: numeroDocumento,
          usr_nombre: nombre,
          usr_apellido: apellido,
          usr_email: email,
          usr_contrasenia: hashedPassword,
        }),
      });

      if (response.ok) {
        setError("");
        setSnackbarOpen(true);
        emptyData();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        //navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "Registro fallido");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      setError("Hubo un problema al registrarse");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="signup">
      <Helmet>
        <title>Registro || General Shop</title>
      </Helmet>
      <div className="signup-container">
        <h1 className="title">Registro</h1>
        <form action="" className="form" onSubmit={handleSubmit}>
          <TextField
            required
            disabled={cargando}
            type="text"
            id="nombre-basic"
            label="Nombre"
            variant="standard"
            value={nombre}
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                setNombre(e.target.value);
              }
            }}
            inputProps={{
              maxLength: 50,
            }}
          />

          <TextField
            required
            disabled={cargando}
            type="text"
            id="apellidos-basic"
            label="Apellidos"
            variant="standard"
            value={apellido}
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                setApellido(e.target.value);
              }
            }}
            inputProps={{
              maxLength: 50,
            }}
          />

          <TextField
            required
            disabled={cargando}
            id="standard-select-tipo-documento"
            select
            label="Tipo documento"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
            helperText="Selecciona tu tipo de documento"
            variant="standard"
          >
            {documentTypes.map((option) => (
              <MenuItem key={option.tpd_id} value={option.tpd_id}>
                {option.tpd_descripcion}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            disabled={cargando}
            type="text"
            id="numero-documento-basic"
            label="Número documento"
            variant="standard"
            value={numeroDocumento}
            onChange={(e) => {
              if (e.target.value.length <= 15) {
                setNumeroDocumento(e.target.value);
              }
            }}
            inputProps={{
              maxLength: 15,
            }}
          />

          <TextField
            required
            disabled={cargando}
            type="email"
            id="email"
            label="Correo Electrónico"
            helperText="Se enviará un correo de confirmación"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            disabled={cargando}
            id="standard-password-input"
            label="Contraseña"
            type="password"
            autoComplete="new-password"
            variant="standard"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <TextField
            required
            disabled={cargando}
            id="standard-password-confirm-input"
            label="Repetir contraseña"
            type="password"
            autoComplete="new-password"
            variant="standard"
            value={repetirContrasenia}
            onChange={(e) => setRepetirContrasenia(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <Button type="submit" variant="contained" disabled={cargando}>
            Crear
          </Button>
        </form>
        <br />
        <Button variant="outlined" disabled={cargando}>
          <Link to="/login">Ya tengo cuenta</Link>
        </Button>
      </div>
      <Snackbar open={snackbarOpen} autoHideDuration={3000}>
        <Alert severity={"success"} variant="filled" sx={{ width: "100%" }}>
          Usuario registrado exitosamente. Serás redirigido al inicio de sesión
          en 3 segundos.
        </Alert>
      </Snackbar>
    </div>
  );
};

export { CreateAccount };
