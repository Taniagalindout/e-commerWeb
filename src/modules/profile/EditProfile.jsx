import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { updateUser } from "../../service/admin-user/EditUser";
import { toast } from "react-toastify";
import "../../assets/css/register.css";
import { useNavigate } from "react-router-dom";
import { FiWifi } from "react-icons/fi";

const EditProfile = ({ userData, token, updateUserData }) => {
  const [show, setShow] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  // Estado para la alerta de conexión
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
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
    setEditedUserData(userData);
  }, [userData]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveChanges = async () => {
    const isValid = validateForm();
    if (!isOnline) {
      setShowConnectionAlert(true);
      console.log("No hay conexiónssssss");
      return;
    }
    if (isValid) {
      try {
        const response = await updateUser(
          token,
          editedUserData.idUser,
          editedUserData
        );
        handleClose();
        toast.success("Información actualizada correctamente");

        updateUserData();
      } catch (error) {
        toast.error("Hubo un problema al actualizar la información");
        console.log(editedUserData);
        console.log(token);
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const emptyFieldsArray = [];

    if (
      !editedUserData ||
      !editedUserData.name ||
      editedUserData.name.length < 2
    ) {
      emptyFieldsArray.push("name");
    }
    if (
      !editedUserData ||
      !editedUserData.lastname ||
      editedUserData.lastname.length < 2
    ) {
      emptyFieldsArray.push("lastname");
    }
    if (
      !editedUserData ||
      !editedUserData.email ||
      !/^\S+@\S+\.\S+$/.test(editedUserData.email)
    ) {
      emptyFieldsArray.push("email");
    }

    setEmptyFields(emptyFieldsArray);
    setFormSubmitted(true);

    return emptyFieldsArray.length === 0;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <AiFillEdit />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar información personal</Modal.Title>
          {showConnectionAlert && !isOnline && (
          <div className="alert alert-warning" role="alert">
            Cuidado ! Necesitas conexión a internet
            <FiWifi />
          </div>
        )}
        </Modal.Header>
        <Modal.Body>
          {editedUserData && (
            <>
              <label className="text">Nombre:</label>
              <input
                type="text"
                name="name"
                value={editedUserData.name || ""}
                onChange={handleChange}
                className={`input-form ${
                  formSubmitted &&
                  (emptyFields.includes("name") ||
                    editedUserData.name.length < 2)
                    ? "input-error"
                    : ""
                }`}
              />
              {formSubmitted && emptyFields.includes("name") && (
                <span className="error-message">
                  El nombre debe tener al menos 2 caracteres<p></p>
                </span>
              )}

              <label className="text">Apellido(s):</label>
              <input
                type="text"
                name="lastname"
                value={editedUserData.lastname || ""}
                onChange={handleChange}
                className={`input-form ${
                  formSubmitted &&
                  (emptyFields.includes("lastname") ||
                    editedUserData.lastname.length < 2)
                    ? "input-error"
                    : ""
                }`}
              />
              {formSubmitted && emptyFields.includes("lastname") && (
                <span className="error-message">
                  El apellido debe tener al menos 2 caracteres <p></p>
                </span>
              )}

              <label className="text">Correo electrónico:</label>
              <input
                type="text"
                name="email"
                value={editedUserData.email || ""}
                onChange={handleChange}
                className={`input-form ${
                  formSubmitted &&
                  (emptyFields.includes("email") ||
                    !/^\S+@\S+\.\S+$/.test(editedUserData.email))
                    ? "input-error"
                    : ""
                }`}
              />
              {formSubmitted && emptyFields.includes("email") && (
                <span className="error-message">
                  Ingrese un correo electrónico válido <p></p>
                </span>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="row align-items-center">
            <div className="col text-end">
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </div>
            <div className="col d-flex align-items-center">
              <button
                className="button-form login register-button d-flex align-items-center"
                onClick={handleSaveChanges}
              >
                <span className="login-button-text">Guardar</span>
                <AiOutlineCheck className="ms-2 login-button-text" />
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProfile;
