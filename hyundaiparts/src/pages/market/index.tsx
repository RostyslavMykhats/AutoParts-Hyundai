import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import s from "./market.module.scss";
import SingleProduct from "@/components/singleProduct";

  
const Market: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={s.banner}></div>
      <Container>
        <Row>
          <Col xs={4}></Col>
          <Col xs={8} className="d-flex flex-wrap gap-3">
            {products.map((p) => (
              <SingleProduct product={p}/>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Market;



