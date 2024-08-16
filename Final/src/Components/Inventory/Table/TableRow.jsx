/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";

export default function TableRow({ product, UpdateModal, DeleteModal }) {
  return (
    <tr key={product.id} className="align-middle">
      <td className="p-3">{product.id}</td>
      <td className="p-3">{product.name}</td>
      <td className="p-3">{product.sku}</td>
      <td className="p-3">${product.price}</td>
      <td className="p-3">{product.quantity}</td>
      <td className="p-3">
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="primary"
            className="d-flex align-items-center justify-content-center p-2"
            onClick={UpdateModal}
          >
            Update
          </Button>
          <Button
            variant="danger"
            className="d-flex align-items-center justify-content-center p-2"
            onClick={DeleteModal}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
