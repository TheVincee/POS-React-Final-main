import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Products({ product, decrementQuantity, incrementQuantity }) {
  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center mb-2 rounded-lg shadow-sm bg-white"
      style={{ fontSize: '1rem', padding: '1rem' }}
    >
      <span>
        <strong>{product.name}</strong> - ${product.price} x {product.quantity}
      </span>
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={decrementQuantity}
          style={{ borderRadius: '50%' }}
        >
          <FaMinus />
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={incrementQuantity}
          style={{ borderRadius: '50%' }}
        >
          <FaPlus />
        </Button>
      </div>
    </ListGroup.Item>
  );
}
