import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import s from "./market.module.scss";
import SingleProduct from "@/components/singleProduct";
import { getData } from "@/utils/Fetch";

const Market = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // get products
  useEffect(() => {
    getData("https://fakestoreapi.com/products", "").then((data) => {
      setProducts(data);
    });
  }, []);

  // get products categories
  useEffect(() => {
    getData("https://fakestoreapi.com/products/categories", "").then((data) => {
      setCategories(data);
    });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col xs={12}>
            <div className={s.banner}></div>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <ul className={s.categories}>
              <li
                style={{
                  marginBottom: "20px",
                  borderBottom: "1px solid silver",
                  width: "100%",
                }}
              >
                Category
              </li>
              <li
                className={`${s.category} ${selectedCategory === "All" ? s.active : ""}`}
                onClick={() => handleCategoryClick("All")}
              >
                All items
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  className={`${s.category} ${selectedCategory === category ? s.active : ""}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={8} className="d-flex flex-wrap gap-3">
            {filteredProducts.map((p) => (
              <SingleProduct key={p.id} product={p} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Market;

