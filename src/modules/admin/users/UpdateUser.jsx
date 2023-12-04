import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { updateUser } from '../../../service/admin-user/EditUser';
import "../../../assets/css/user.css";
import { toast } from 'react-toastify';

function UpdateUser({ userData, token }) {
  const [show, setShow] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  useEffect(() => {
    setEditedUserData(userData);
  }, [userData]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveChanges = async () => {
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await updateUser(token, editedUserData.idUser, editedUserData);
        console.log('Respuesta de updateUser:', response);
        handleClose();
        toast.success("Usuario actualizado correctamente");
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
        toast.error("Hubo un problema al actualizar el usuario");
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
    
    if (!editedUserData || !editedUserData.name || editedUserData.name.length < 2) {
      emptyFieldsArray.push("name");
      toast.error("El nombre debe tener al menos 2 caracteres");
    }
    if (!editedUserData || !editedUserData.lastname || editedUserData.lastname.length < 2) {
      emptyFieldsArray.push("lastname");
      toast.error("El apellido debe tener al menos 2 caracteres");
    }
    if (!editedUserData || !editedUserData.email || !/^\S+@\S+\.\S+$/.test(editedUserData.email)) {
      emptyFieldsArray.push("email");
      toast.error("Ingrese un correo electrónico válido");
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
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedUserData && (
            <>
              <input
                type="text"
                name="name"
                value={editedUserData.name || ''}
                onChange={handleChange}
                className={`input-form ${
                  formSubmitted && (emptyFields.includes("name") || editedUserData.name.length < 2)
                    ? "input-error"
                    : ""
                }`}
              />
              <input
                type="text"
                name="lastname"
                value={editedUserData.lastname || ''}
                onChange={handleChange}
                className={`input-form ${
                  formSubmitted && (emptyFields.includes("lastname") || editedUserData.lastname.length < 2)
                    ? "input-error"
                    : ""
                }`}
              />
              <input
                type="text"
                name="email"
                value={editedUserData.email || ''}
                onChange={handleChange}
                className={`input-form ${
                  formSubmitted && (emptyFields.includes("email") || !/^\S+@\S+\.\S+$/.test(editedUserData.email))
                    ? "input-error"
                    : ""
                }`}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateUser;
