/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

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
    <Modal show={isOpen} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addProduct}>
          <Form.Group controlId="formProductName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={product.Name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductSku">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="secondary" onClick={toggleModal} className="mr-2">
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;
