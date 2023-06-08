import React, { useState, useEffect } from "react";
import s from "./sell.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

const Sell = ({ onProductAdded }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the category is selected
    if (!category) {
      console.log("Please select a category.");
      return; // Stop the function execution if the category is not selected
    }
  
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const newProductId = products.length + 1;
  
    const newProduct = {
      id: newProductId,
      title,
      price,
      description,
      category,
      image: imageURL,
    };
  
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
  
    try {
      const response = await axios.post(
        "https://64820d8829fa1c5c503286f2.mockapi.io/products",
        newProduct
      );
  
      // Call the onProductAdded callback if provided
      if (onProductAdded) {
        onProductAdded(newProduct);
      }
  
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImageURL("");
  
      console.log("Product added:", newProduct);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://64820d8829fa1c5c503286f2.mockapi.io/products"
        );
        console.log("Fetched data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ minHeight: "75vh" }}>
      <Container className="mt-5">
        <Row>
          <Col xs={12} className="mt-5">
            <h3 className={s.title}>List Your Part</h3>
            <p className={s.title__desc}>
              Fill out the following prompts that accurately describe your part
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows={3}
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelry</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="imageURL" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="imageURL"
                  value={imageURL}
                  onChange={handleImageURLChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-5">
                Add Product
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sell;
