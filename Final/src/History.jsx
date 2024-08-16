import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Table, Button, Modal } from 'react-bootstrap';

const API_URL = "http://localhost:5222/api/Order";

export default function Historys() {
  const [historys, setHistory] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getHistory = async () => {
    try {
      const result = await fetchData(`${API_URL}/AllHistory`, "GET");
      setHistory(result);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const viewOrder = async (orderId) => {
    try {
      const result = await fetchData(`${API_URL}/ViewOrder/${orderId}`, "GET");
      setSelectedOrderDetails(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderDetails([]);
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Header />

      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="w-75">
          <Table responsive bordered className="mt-3">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {historys.map((history) => (
                <tr key={history.OrderId} className="align-middle">
                  <td>{history.OrderId}</td>
                  <td>{history.OrderDate}</td>
                  <td>${history.TotalAmount}</td>
                  <td>
                    <Button
                      variant="link"
                      className="text-decoration-none p-0"
                      onClick={() => viewOrder(history.OrderId)}
                    >
                      <FaEye className="text-primary" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={isModalOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrderDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.ProductName}</td>
                  <td>{item.Quantity}</td>
                  <td>${item.Price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
