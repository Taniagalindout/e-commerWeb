import React, { useState } from 'react'
import '../../assets/css/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/logo.png'
import { useEffect } from 'react';



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const googleLogin = () => {
        console.log("Inicio sesión con Google");
    }

    const login = () => {
        console.log("Inicio sesión con Google");
    }

    useEffect(() => {
      console.log("Renderizo el login")
    }, [])
    

    return (
        <div className="page-container">
            <div className="login-container">
                <div className="login-card-container">
                    <div className="head-login-container">
                        <img src={logo} className='login-logo' alt='SaleHub' />
                        <h2 className='welcome-text'>Bienvenido a SaleHub</h2>
                        <h3 className='login-text'>Inicia sesión</h3>
                    </div>
                    <div className="form-container">
                        <input className='input-form' placeholder='Correo electrónico' type='text' />
                        <div className='password-input-container'>
                            <input
                                className='input-form '
                                placeholder='Contraseña'
                                type={showPassword ? 'text' : 'password'}
                            />
                            <button
                                className='password-toggle-button'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    className='eye-icon'
                                />
                            </button>
                        </div>
                        <div className="register">
                            <span>¿No tienes cuenta? </span>
                            <a href='#' className='forgot-password'> Regístrate</a>
                        </div>
                    </div>
                    <button className='button-form login' onClick={login}>
                        <span className='login-button-text'>Iniciar sesión</span>
                    </button>
                    <button className='button-form google-login' onClick={googleLogin}>
                        {//Aqui va el icono de Google pero no lo encontré
                        }
                        <span className='login-button-text'>Iniciar sesión con Google</span>
                    </button>
                    <a href='#' className='forgot-password'>Olvidé mi contraseña</a>
                </div>
            </div>
        </div>
    )
}

export default Login;
