/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function FilterTable({ product, addToSelectedProducts }) {
  return (
    <Card className="mb-3 rounded-lg shadow-sm bg-light">
      <Card.Body className="p-4">
        <Card.Title className="font-weight-bold mb-2">{product.name}</Card.Title>
        <Card.Text className="text-muted mb-1">Price: ${product.price}</Card.Text>
        <Card.Text className="text-muted">Stock: {product.quantity}</Card.Text>
        <Button
          variant="primary"
          className="w-100 mt-3"
          onClick={addToSelectedProducts}
          style={{ borderRadius: '25px', padding: '10px' }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
