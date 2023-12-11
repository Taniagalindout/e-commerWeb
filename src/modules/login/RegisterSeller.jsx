import React, { useEffect, useState } from "react";
import "../../assets/css/register.css";
import logo from "../../assets/images/logo.png";
import image from "../../assets/images/register-img.png";
import shoppingimg from "../../assets/images/shopping.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { createUser } from "../../service/user/UserService";
import { createSeller } from "../../service/user/UserSeller";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterSeller = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    seller: {
      seller: {
        rol: { idRol: 2 },
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: '',
        status: true,
      },
      rfc: '',
      shopType: '',
    },
    ine: null,
  });
  const navigate = useNavigate();
  const [emptyFields, setEmptyFields] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validationErrors, setValidationErrors] = useState({
    rfc: "",
    shopType: "",
  });
  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const { name, lastname, email, password } = formData;
    const emptyFieldsArray = [];
    if (name === "") emptyFieldsArray.push("name");
    if (lastname === "") emptyFieldsArray.push("lastname");
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      emptyFieldsArray.push("email");
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}/.test(password)) {
      emptyFieldsArray.push("password");
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
    setEmptyFields(emptyFieldsArray);
    return emptyFieldsArray.length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    let errorMessage = "";

    if (name === "rfc") {
      newValue = value.replace(/[^a-zA-Z0-9]/g, "").substring(0, 13);
      if (value !== newValue) {
        errorMessage = "Solo se permiten números y letras.";
      }
    } else if (name === "shopType") {
      newValue = value.replace(/[^a-zA-Z]/g, "");
      if (value !== newValue) {
        errorMessage = "Solo se permiten letras.";
      }
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Actualizar mensajes de validación
    setValidationErrors({
      ...validationErrors,
      [name]: errorMessage,
    });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      ine: file,
    });
  };

  const register = async () => {
    setFormSubmitted(true);
    validateForm();

    if (!validateForm()) {
      toast.error("Completa todos los campos.");
      if (!/^\S+@\S+\.\S+$/.test(formData.email))
        return toast.error("Ingresa un email valido.");
      return;
    }

    try {
      const userResponse = await createUser(formData.seller.seller);
      console.log("UserResponse", userResponse);
      if (userResponse.data.idUser) {
        const sellerData = {
          user: {
            idUser: userResponse.data.idUser,
          },
          rfc: formData.rfc,
          ine: formData.ine || 'Valor predeterminado si está vacío',
          shopType: formData.shopType,
        };

        const formDataToUpload = new FormData();
        formDataToUpload.append('seller', JSON.stringify(sellerData));
        formDataToUpload.append('ine', formData.ine);

        const sellerResponse = await createSeller(formDataToUpload);
        if (
          sellerResponse.status === 201 &&
          sellerResponse.message === "success"
        ) {
          console.log("El vendedor se ha creado correctamente");
          navigate("/login");
          toast.success(
            "¡Usuario y vendedor creados correctamente! Ahora puedes iniciar sesión"
          );
        } else {
          console.log("Hubo un error al crear el vendedor");
          toast.error("Hubo un error al crear el vendedor");
        }
      } else {
        console.log("No se obtuvo el ID del usuario después del registro");
        toast.error("Hubo un problema al registrar el usuario");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="page-container">
      <div className="register-container">
        <div className="register-card-container-parent">
          <div className="left-container">
            <img src={logo} className="register-logo" alt="SaleHub" />
            <img src={shoppingimg} className="register-image" alt="SaleHub" />
          </div>
          <div className="rigth-container">
            <h2 className="register-text">Registrate vendedor</h2>
            <span className="text">
              ¡Comienza ahora!, Vende tus productos en línea.
            </span>
            <div className="container-inputs-name">
              <div className="container-column">
                <label className="text">Nombre:</label>
                <input
                  className={`input-form ${
                    formSubmitted && emptyFields.includes("name")
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="Nombre"
                  type="text"
                  name="name"
                  value={formData.seller.seller}
                  onChange={handleInputChange}
                />
              </div>
              <div className="container-column">
                <label className="text">Apellido(s):</label>
                <input
                  className={`input-form ${
                    formSubmitted && emptyFields.includes("lastname")
                      ? "input-error"
                      : ""
                  }`}
                  placeholder="Apellido(s)"
                  type="text"
                  name="lastname"
                  value={formData.seller.seller}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <label className="text">Correo electronico:</label>
            <input
              className={`input-form ${
                formSubmitted && (emptyFields.includes("email") || !validEmail)
                  ? "input-error"
                  : ""
              }`}
              placeholder="Correo electronico"
              type="text"
              name="email"
              value={formData.seller.seller}
              onChange={handleInputChange}
            />
            <label className="text">Contraseña:</label>
            <div className="password-input-container">
              <input
                className={`input-form ${
                  formSubmitted &&
                  (emptyFields.includes("password") || !validPassword)
                    ? "input-error"
                    : ""
                }`}
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.seller.seller}
                onChange={handleInputChange}
              />
              <button
                className="password-toggle-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="eye-icon"
                />
              </button>
            </div>
            <label className="text">RFC:</label>
            <input
              className={`input-form ${
                formSubmitted && emptyFields.includes("rfc")
                  ? "input-error"
                  : ""
              }`}
              placeholder="RFC"
              type="text"
              name="rfc"
              value={formData.seller.seller}
              onChange={handleInputChange}
            />
            {validationErrors.rfc && (
              <span className="error-message">{validationErrors.rfc}</span>
            )}
            <label className="text">Tipo de venta:</label>
            <input
              className={`input-form`}
              placeholder="Tipo de venta"
              type="text"
              name="shopType"
              value={formData.seller.seller}
              onChange={handleInputChange}
            />
            {validationErrors.shopType && (
              <span className="error-message">{validationErrors.shopType}</span>
            )}
            <label className="text">Comprobante de identidad:</label>
            <input
              className={`input-form`}
              type="file"
              name="ine"
              value={formData.ine}
              onChange={handleInputChange}
            />
            {formSubmitted && !validPassword && (
              <div className="container-error-password">
                <span className="error-message">La contraseña de tener:</span>
                <lu>
                  <li className="error-message">Minimo 8 carcacteres</li>
                  <li className="error-message">Una letra mayuscula</li>
                  <li className="error-message">Un numero</li>
                  <li className="error-message">Un caracter especial</li>
                </lu>
              </div>
            )}
            <button
              className="button-form login register-button"
              onClick={register}
            >
              <span className="login-button-text">Registrate</span>
            </button>
            <div className="sign-in">
              <span className="">¿Ya tienes una cuenta? </span>
              <Link to="/login" className="forgot-password">
                Inicia sesion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterSeller;
