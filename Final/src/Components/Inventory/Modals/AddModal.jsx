/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function AddModal({ isOpen, addProduct, setProduct, product, toggleModal }) {
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <Modal show={isOpen} onHide={toggleModal} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="text-primary">Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Form onSubmit={addProduct}>
          <Form.Group controlId="formProductName" className="mb-3">
            <Form.Label className="fw-semibold">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="shadow-sm rounded"
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductSku" className="mb-3">
            <Form.Label className="fw-semibold">SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              placeholder="Enter product SKU"
              className="shadow-sm rounded"
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice" className="mb-3">
            <Form.Label className="fw-semibold">Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="shadow-sm rounded"
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductQuantity" className="mb-4">
            <Form.Label className="fw-semibold">Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter product quantity"
              className="shadow-sm rounded"
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="outline-secondary" onClick={toggleModal} className="me-2 rounded-pill px-4">
              Close
            </Button>
            <Button variant="primary" type="submit" className="rounded-pill px-4">
              Add Product
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;
