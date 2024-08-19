/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";
import { FaEye, FaPrint } from "react-icons/fa";
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

  const printOrderDetails = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    const printContent = document.getElementById("order-details").innerHTML;
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Order Details</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 10px; }
          th { background-color: #f8f9fa; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Order Details</h1>
        ${printContent}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Header />

      <div className="container mt-5">
        <Table responsive bordered hover className="shadow rounded">
          <thead className="bg-dark text-white">
            <tr>
              <th>ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {historys.map((history) => (
              <tr key={history.OrderId}>
                <td>{history.OrderId}</td>
                <td>{history.OrderDate}</td>
                <td>${history.TotalAmount.toFixed(2)}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    className="p-2 rounded-circle"
                    onClick={() => viewOrder(history.OrderId)}
                  >
                    <FaEye size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={isModalOpen} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="order-details">
              <Table responsive bordered hover>
                <thead className="bg-light">
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
                      <td>${item.Price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="info" onClick={printOrderDetails}>
              <FaPrint size={18} /> Print
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
