import React, { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";

const url = "https://server-general.up.railway.app/api/user/signup";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [tipoDocumento, setTipoDocumento] = useState(1);
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [repetirContrasenia, setRepetirContrasenia] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    // Validar el formato del correo electrónico utilizando una expresión regular
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Validar la contraseña: mínimo 5 caracteres, al menos una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contrasenia !== repetirContrasenia) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!validateEmail(email)) {
      setError("El correo electrónico no es válido.");
      return;
    }

    if (!validatePassword(contrasenia)) {
      setError(
        "La contraseña debe tener al menos 5 caracteres, incluyendo mayúsculas, minúsculas y números."
      );
      return;
    }

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
          usr_contrasenia: contrasenia,
        }),
      });

      if (response.ok) {
        console.log("Registro exitoso");
        setError("");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "Registro fallido");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      setError("Hubo un problema al registrarse");
    }
  };

  const currencies = [
    {
      value: 1,
      label: "Cédula de ciudadanía",
    },
    {
      value: 2,
      label: "Registro Civil",
    },
    {
      value: 3,
      label: "Tarjeta de Identidad",
    },
    {
      value: 4,
      label: "Documento Extranjero",
    },
  ];

  return (
    <div className="signup">
      <div className="signup-container">
        <h1 className="title">Registro</h1>
        <form action="" className="form" onSubmit={handleSubmit}>
          <TextField
            required
            type="text"
            id="nombre-basic"
            label="Nombre"
            variant="standard"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            required
            type="text"
            id="apellidos-basic"
            label="Apellidos"
            variant="standard"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <TextField
            id="standard-select-tipo-documento"
            select
            label="Tipo documento"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
            helperText="Selecciona tu tipo de documento"
            variant="standard"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            type="text"
            id="numero-documento-basic"
            label="Número documento"
            variant="standard"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
          />
          <TextField
            required
            type="email"
            id="email"
            label="Correo Electrónico"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="standard-password-input"
            label="Contraseña"
            type="password"
            autoComplete="new-password" // Cambiado el valor a new-password
            variant="standard"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <TextField
            required
            id="standard-password-confirm-input" // Cambiado el id a uno diferente
            label="Repetir contraseña"
            type="password"
            autoComplete="new-password" // Cambiado el valor a new-password
            variant="standard"
            value={repetirContrasenia}
            onChange={(e) => setRepetirContrasenia(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <Button type="submit" variant="contained">
            Crear
          </Button>
        </form>
      </div>
    </div>
  );
};

export { CreateAccount };
