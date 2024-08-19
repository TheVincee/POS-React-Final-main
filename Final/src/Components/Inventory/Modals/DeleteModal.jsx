// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const DeleteModal = ({ isOpen, toggleModal, handleDeleteProduct }) => {
  return (
    <Modal 
      show={isOpen} 
      onHide={toggleModal} 
      centered
      dialogClassName="modal-60w"
      className="fade"
    >
      <Modal.Header closeButton className="border-0 bg-danger text-white">
        <Modal.Title className="fw-bold">Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 text-center">
        <p className="mb-0">Are you sure you want to delete this product?</p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center bg-light p-3">
        <Button variant="outline-secondary" onClick={toggleModal} className="rounded-pill px-4 shadow-sm me-2">
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteProduct} className="rounded-pill px-4 shadow-sm">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
