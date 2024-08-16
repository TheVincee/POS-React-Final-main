// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal, Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const DeleteModal = ({ isOpen, toggleModal, handleDeleteProduct }) => {
  return (
    <Modal show={isOpen} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this product?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteProduct}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteModal;
