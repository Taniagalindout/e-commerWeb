import React, { useEffect, useState } from "react";
import "../../assets/css/register.css";
import logo from "../../assets/images/logo.png";
import image from "../../assets/images/register-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { createUser } from "../../service/user/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../Firebase";
import { auth } from "../../Firebase";
import { FiWifi } from "react-icons/fi";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    rol: {
      idRol: 4,
    },
  });
  const navigate = useNavigate();
  const [emptyFields, setEmptyFields] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [showConnectionAlert, setShowConnectionAlert] = useState(false); // Nuevo estado para la alerta de conexión
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);
  
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const register = () => {
    console.log("Entro a iniciar sesion: ", formData);
    setFormSubmitted(true);
    if (!isOnline) {
      // Aquí verificamos la conexión antes de realizar el registro
      setShowConnectionAlert(true);
      return;
    }
    validateForm();
    if (!validateForm()) {
      toast.error("Completa todos los campos.");
      if (!/^\S+@\S+\.\S+$/.test(formData.email))
        return toast.error("Ingresa un email valido.");
      return;
    }
    const response = createUser(formData)
      .then((response) => {
        //console.log("Ya cree el usuario: ", response)
        if (response.status == 201 && response.message == "success") {
          console.log("El usuario se ha creado correctamente");
          navigate("/login");
          toast.success(
            "¡Usuario creado correctamente! Ahora puedes iniciar sesion"
          );
        } else {
          console.log("El usuario YA EXISTE");
          toast.error(
            "Parece que ya hay un usuario registrado con este correo."
          );
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      const user = auth.currentUser; 
      if (user) {
        const { displayName, email } = user;
        let name = "";
        let lastName = "";
        if (displayName.includes(" ")) {
          const nameArray = displayName.split(" ");
          name = nameArray[0];
          lastName = nameArray.slice(1).join(" ");
        } else {
          name = displayName;
        }

        // Objeto con datos del usuario
        const userData = {
          name,
          lastname: lastName,
          email,
          password: "",
          rol: {
            idRol: 1,
          },
        };
        const response = await createUser(userData);
        if (response.status === 201 && response.message === "success") {
          console.log("El usuario se ha creado correctamente");
          navigate("/login");
          toast.success(
            "¡Usuario creado correctamente! Ahora puedes iniciar sesión"
          );
        } else {
          console.log("El usuario YA EXISTE");
          toast.error(
            "Parece que ya hay un usuario registrado con este correo."
          );
        }
      }
    } catch (error) {
      console.error("Error en inicio de sesión con Google:", error);
    }
  };

  return (
    <div className="page-container">
      {/* Alerta de conexión */}
      {showConnectionAlert && !isOnline && (
        <div className="alert alert-warning" role="alert">
          Cuidado ! Necesitas conexión a internet
          <FiWifi />
        </div>
      )}
      <div className="register-container">
        <div className="register-card-container-parent">
          <div className="left-container">
            <img src={logo} className="register-logo" alt="SaleHub" />
            <img src={image} className="register-image" alt="SaleHub" />
          </div>
          <div className="rigth-container">
            <h2 className="register-text">Registrate</h2>
            <span className="text">
              ¡Vamos!, Registrate para escoger la gran variedad de productos que
              tenemos para tí.
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
                  value={formData.name}
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
                  value={formData.lastname}
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
              value={formData.email}
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
                value={formData.password}
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
            <button
              className="button-form google-login register-button"
              onClick={handleGoogleSignIn}
            >
            
              <span className="login-button-text">Registrate con Google</span>
            </button>
            <div className="sign-in">
              <span className="">¿Ya tienes una cuenta? </span>
              <Link to="/login" className="forgot-password">
                Inicia sesion
              </Link>
              <p></p>
              <Link to="/registerseller" className="forgot-password">
                Comienza a vender con nosotros
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
