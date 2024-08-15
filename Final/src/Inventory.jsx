import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";
import UpdateModal from "./Components/Inventory/Modals/UpdateModal";
import DeleteModal from "./Components/Inventory/Modals/DeleteModal";
import AddModal from "./Components/Inventory/Modals/AddModal";
import TableRow from "./Components/Inventory/Table/TableRow";
import { Button, Table, InputGroup, FormControl, Spinner, Container, Row, Col } from "react-bootstrap";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modals, setModals] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [product, setProduct] = useState({
    Name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  const API_URL = "http://localhost:5222/api/ProductApi";

  // Fetch products from the API
  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await fetchData(`${API_URL}/GetProducts`, "GET");
      setProducts(result);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await fetchData(`${API_URL}/SaveProduct`, "POST", product);
      toggleModal("add");
      getProducts(); // Refresh the product list after adding
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  // Update an existing product
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await fetchData(`${API_URL}/UpdateProduct?id=${currentItem.id}`, "PUT", product);
      toggleModal("update");
      getProducts(); // Refresh the product list after updating
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  // Delete a product
  const handleDeleteProduct = async () => {
    if (currentItem && currentItem.id) {
      try {
        await fetchData(`${API_URL}/DeleteProduct?id=${currentItem.id}`, "DELETE");
        toggleModal("delete");
        getProducts(); // Refresh the product list after deleting
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert(`Failed to delete product. Error: ${error.message}`);
      }
    } else {
      alert("No product selected for deletion.");
    }
  };

  // Toggle modal visibility and set current item
  const toggleModal = (modalType, item = null) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalType]: !prevModals[modalType],
    }));
    setCurrentItem(item);

    if (modalType === "update" && item) {
      setProduct({
        Name: item.name,
        sku: item.sku,
        price: item.price,
        quantity: item.quantity,
      });
    } else if (modalType === "add") {
      setProduct({ Name: "", sku: "", price: "", quantity: "" });
    }
  };

  useEffect(() => {
    getProducts(); // Fetch products on component mount
  }, []);

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="mb-3">
          <Col md={8}>
            <InputGroup>
              <FormControl
                placeholder="Search for Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4} className="text-right">
            <Button variant="dark" onClick={() => toggleModal("add")}>
              <FaPlus className="mr-2" /> Add
            </Button>
          </Col>
        </Row>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table striped bordered hover className="rounded">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  product={product}
                  updateModal={() => toggleModal("update", product)}
                  deleteModal={() => toggleModal("delete", product)}
                />
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      {/* Delete Modal */}
      <DeleteModal
        isOpen={modals.delete}
        toggleModal={() => toggleModal("delete")}
        handleDeleteProduct={handleDeleteProduct}
      />
      {/* Add Modal */}
      <AddModal
        isOpen={modals.add}
        addProduct={addProduct}
        setProduct={setProduct}
        product={product}
        toggleModal={() => toggleModal("add")}
      />
      {/* Update Modal */}
      <UpdateModal
        isOpen={modals.update}
        toggleModal={() => toggleModal("update")}
        updateProduct={updateProduct}
        setProduct={setProduct}
        product={product}
      />
    </>
  );
}
