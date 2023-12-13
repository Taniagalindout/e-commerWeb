import React, { useState } from "react";
import { changePassword } from "../../service/password/ChangePassword"; // Asegúrate de importar el servicio correspondiente
import { toast } from "react-toastify";
import "../../assets/css/pass.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import passwordImg from "../../assets/images/password.png";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = (password) => {
    
    const isValidPassword = password.length >= 6;
    setValidPassword(isValidPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!validPassword) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const data = { password };
      const response = await changePassword(data); 
      console.log(response);
      if (response.status === 200) {
        toast.success("¡Contraseña cambiada exitosamente!");
      } else {
        console.error("Hubo un problema al cambiar la contraseña");
      }
    } catch (error) {
      console.error("Error al intentar cambiar la contraseña:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center">
            <Card className="mt-3 cardPass">
              <Card.Body className="text-center">
                <Card.Title>Cambiar contraseña</Card.Title>
                <Card.Img
                  variant="top"
                  src={passwordImg}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <Card.Text className="mt-3">
                  Ingresa tu nueva contraseña y confírmala para cambiarla
                </Card.Text>

                <form onSubmit={handleSubmit}>
                  <label>
                    Nueva Contraseña:
                    <input
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className={`input-form ${
                        formSubmitted && !validPassword ? "input-error" : ""
                      }`}
                    />
                    {formSubmitted && !validPassword && (
                      <span className="error-message">
                        La contraseña debe tener al menos 6 caracteres
                      </span>
                    )}
                  </label>
                  <label>
                    Confirmar Contraseña:
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                  </label>
                  {formSubmitted && password !== confirmPassword && (
                    <span className="error-message">
                      Las contraseñas no coinciden
                    </span>
                  )}
                  <Button className="button-form login" type="submit">
                    <span className="login-button-text">Cambiar Contraseña</span>
                  </Button>
                  <p></p>
                  <Link to="/lostpass" className="forgot-password">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
