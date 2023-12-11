import React, { useState, useEffect } from "react";
import "../../assets/css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.png";
import { signInWithGoogle } from "../../Firebase";
import { Link } from "react-router-dom";
import { login } from "../../service/auth/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine); // Estado para verificar la conexión
  const navigate = useNavigate();

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
    const checkUserSession = async () => {
      const cache = await caches.open("salehub-cache-v1");
      const userDataResponse = await cache.match("userData");
      if (userDataResponse) {
        const userData = await userDataResponse.json();
        navigate("/");
      }
    };

    checkUserSession();
  }, [navigate]);

  useEffect(() => {
    validateForm();
  }, [loginData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, password } = loginData;
    const emptyFieldsArray = [];
    if (email === "") emptyFieldsArray.push("email");
    if (password === "") emptyFieldsArray.push("password");
    setEmptyFields(emptyFieldsArray);
    return emptyFieldsArray.length === 0;
  };

  const signin = () => {
    setFormSubmitted(true);
    if (!isOnline) {
      return alert("Necesitas conexión a Internet para iniciar sesión.");
    }
    if (!validateForm()) {
      return toast.error("Completa todos los campos.");
    }
    const response = login(loginData)
      .then((response) => {
        console.log("Inicio sesión:", response);
        if (response.status === 401) {
          return toast.error("Usuario y/o contraseña incorrectos.");
        }
        if (response.status === 200) {
          caches.open("salehub-cache-v1").then((cache) => {
            cache.put("userData", new Response(JSON.stringify(response)));
          });
          navigate("/");
          return toast.success(`¡Bienvenido ${response.user.name}!`);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-card-container">
          <div className="head-login-container">
            <img src={logo} className="login-logo" alt="SaleHub" />
            <h2 className="welcome-text">Bienvenido a SaleHub</h2>
            <h3 className="login-text">Inicia sesión</h3>
          </div>
          <div className="form-container">
            <input
              className={`input-form ${
                formSubmitted && emptyFields.includes("password")
                  ? "input-error"
                  : ""
              }`}
              placeholder="Correo electrónico"
              type="text"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
            />
            <div className="password-input-container">
              <input
                className={`input-form ${
                  formSubmitted && emptyFields.includes("password")
                    ? "input-error"
                    : ""
                }`}
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginData.password}
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
            <div className="register">
              <span>¿No tienes cuenta? </span>
              <Link to="/register" className="forgot-password">
                Registrate
              </Link>
            </div>
          </div>
          <button className="button-form login" onClick={signin}>
            <span className="login-button-text">Iniciar sesión</span>
          </button>
          <button
            className="button-form google-login"
            onClick={signInWithGoogle}
          >
            {
              //Aqui va el icono de Google pero no lo encontré
            }
            <span className="login-button-text">Iniciar sesión con Google</span>
          </button>
          <a href="#" className="forgot-password">
            Olvidé mi contraseña
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;