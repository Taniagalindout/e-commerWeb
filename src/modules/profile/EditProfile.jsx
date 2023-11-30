import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const EditProfile = () => {
  const buttonStyle = {
    backgroundColor: "#FF6FC4",
    borderColor: "#FF6FC4",
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button style={buttonStyle} onClick={handleShow}>
        <FaEdit />
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Editar información personal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="number" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="name@example.com" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProfile;
