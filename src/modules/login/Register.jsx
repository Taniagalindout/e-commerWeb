import React, { useState } from 'react'
import '../../assets/css/register.css'
import logo from '../../assets/images/logo.png'
import image from '../../assets/images/register-img.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="page-container">
            <div className="register-container">
                <div className="register-card-container-parent">
                    <div className="left-container">
                        <img src={logo} className='register-logo' alt='SaleHub' />
                        <img src={image} className='register-image' alt='SaleHub' />
                    </div>
                    <div className="rigth-container">
                        <h2 className='register-text'>Registrate</h2>
                        <span className='text'>¡Vamos!, Registrate para escoger la gran variedad de productos que tenemos para tí.</span>
                        <label className='text'>Nombre:</label>
                        <input className='input-form' placeholder='Correo electrónico' type='text' />
                        <label className='text'>Apellido(s):</label>
                        <input className='input-form' placeholder='Correo electrónico' type='text' />
                        <label className='text'>Contraseña:</label>
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
                        <button className='button-form login register-button'>
                            <span className='login-button-text'>Registrate</span>
                        </button>
                        <button className='button-form google-login register-button'>
                            {//Aqui va el icono de Google pero no lo encontré
                            }
                            <span className='login-button-text'>Registrate con Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
