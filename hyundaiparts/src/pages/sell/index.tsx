import React, { useState } from "react";
import axios from "axios";
import s from "./sell.module.scss";
import { Col, Container, Row } from "react-bootstrap";

const Sell = () => {
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
  
    try {
      const response = await axios.post("https://fakestoreapi.com/products", {
        title,
        price,
        description,
        category,
        image: imageURL,
      });
  
      console.log("Product added:", response.data);
      // Додатковий код для обробки успішного додавання товару
  
      // Виконати GET запит для оновлення списку продуктів
  
      // Очистити поля форми
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImageURL("");
    } catch (error) {
      console.error("Error adding product:", error);
      // Додатковий код для обробки помилки при додаванні товару
    }
  };

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
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                />
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
            </form >
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Sell;