/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

export default function TableRow({ product, onUpdate, onDelete }) {
  return (
    <tr key={product.id} className="align-middle">
      <td className="p-3 text-muted">{product.id}</td>
      <td className="p-3 text-dark">{product.name}</td>
      <td className="p-3 text-muted">{product.sku}</td>
      <td className="p-3 text-success">${product.price}</td>
      <td className="p-3 text-muted">{product.quantity}</td>
      <td className="p-3">
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-primary"
            className="rounded-pill px-3 py-1 shadow-sm transition-all hover:bg-primary hover:text-white"
            onClick={onUpdate}
          >
            Update
          </Button>
          <Button
            variant="outline-danger"
            className="rounded-pill px-3 py-1 shadow-sm transition-all hover:bg-danger hover:text-white"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
