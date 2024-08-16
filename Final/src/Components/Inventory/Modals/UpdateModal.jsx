/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateModal = ({ isOpen, toggleModal, updateProduct, setProduct, product }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct();
  };

  return (
    <Modal show={isOpen} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={product.Name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSku" className="mt-3">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={product.sku || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formQuantity" className="mt-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              // eslint-disable-next-line react/prop-types
              value={product.quantity || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
