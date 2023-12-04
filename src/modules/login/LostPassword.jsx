import React, { useState } from "react";
import { lostpass } from "../../service/password/LostPassword";
import { toast } from "react-toastify";
import "../../assets/css/pass.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import passwordImg from "../../assets/images/password.png";

const LostPassword = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    setValidEmail(isValidEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!validEmail) {
      toast.error("Correo inválido");
      return;
    }

    try {
      const data = { email };
      const response = await lostpass(data);
    console.log(response);
      if (response.status === 200) {
        toast.success(
          "Correo electrónico enviado para recuperación de contraseña"
        );
      } else {
        console.error("Hubo un problema al enviar el correo electrónico");
      }
    } catch (error) {
      console.error(
        "Error en la solicitud de recuperación de contraseña:",
        error
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <Card className="mt-3 cardPass">
              <Card.Body className="text-center">
                <Card.Title>Recuperar contraseña</Card.Title>
                <Card.Img
                  variant="top"
                  src={passwordImg}
                  style={{ maxWidth: "100%", height: "auto", width: "100%", marginBottom: "20px" }}
                  />
                <Card.Text className="mt-3">
                  Ingresa tu correo electrónico que usas en SaleHub y recibe un código de verificación
                </Card.Text>

                <form onSubmit={handleSubmit}>
                  <label>
                    Email:
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className={`input-form ${
                        formSubmitted && !validEmail ? "input-error" : ""
                      }`}
                    />
                    {formSubmitted && !validEmail && (
                      <span className="error-message">
                        Ingresa un correo electrónico válido
                      </span>
                    )}
                  </label>
                  <button className="button-form login" type="submit">
                    <span className="login-button-text">Enviar</span>
                  </button>
                </form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostPassword;
