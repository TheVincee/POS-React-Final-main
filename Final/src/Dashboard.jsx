/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Header from "./Header/Header";
import { fetchData as apiFetchData } from "./utilities/ApiUti";
import FilterTable from "./Components/Dashboard/Table/FilterTable";
import Products from "./Components/Dashboard/Table/Products";
import { Button, Spinner, Card, InputGroup, FormControl } from 'react-bootstrap';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const PRODUCTS_API_URL = "http://localhost:5222/api/ProductApi/GetProducts";
  const ORDER_API_URL = "http://localhost:5222/api/Order/Checkout";

  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await apiFetchData(PRODUCTS_API_URL, "GET");
      const productsWithOriginalQuantity = result.map(product => ({
        ...product,
        originalQuantity: product.quantity
      }));
      setProducts(productsWithOriginalQuantity);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToSelectedProducts = (product) => {
    if (product.quantity <= 0) return;

    setSelectedProducts((prevSelected) => {
      const existingProduct = prevSelected.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevSelected.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevSelected, { ...product, quantity: 1 }];
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const incrementQuantity = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((p) =>
        p.id === productId
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const decrementQuantity = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.map((p) =>
        p.id === productId
          ? { ...p, quantity: p.quantity - 1 }
          : p
      ).filter(p => p.quantity > 0) // Remove product if quantity is 0
    );
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    // Handle checkout logic
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <Card className="p-3 shadow rounded bg-light">
              <Card.Body>
                <Card.Title className="h5 mb-4">Selected Products</Card.Title>
                {selectedProducts.length === 0 ? (
                  <p className="text-muted">No products selected</p>
                ) : (
                  <>
                    <ul className="list-unstyled">
                      {selectedProducts.map((product) => (
                        <Products
                          key={product.id}
                          product={product}
                          incrementQuantity={() => incrementQuantity(product.id)}
                          decrementQuantity={() => decrementQuantity(product.id)}
                        />
                      ))}
                    </ul>
                    <div className="mt-3 fw-bold">
                      Total Price: ${calculateTotalPrice()}
                    </div>
                    <Button
                      className="mt-3 w-100"
                      variant="success"
                      onClick={handleCheckout}
                      style={{ borderRadius: '25px' }}
                    >
                      Checkout
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-8">
            <Card className="p-4 shadow rounded bg-light">
              <Card.Body>
                <Card.Title className="h4 mb-3">Products</Card.Title>
                <InputGroup className="mb-3">
                  <FormControl
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-pill"
                  />
                </InputGroup>
                {loading ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <p className="text-muted">No products found</p>
                ) : (
                  <div className="row">
                    {filteredProducts.map((product) => (
                      <div className="col-md-4 mb-3" key={product.id}>
                        <FilterTable
                          product={product}
                          addToSelectedProducts={() => addToSelectedProducts(product)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
