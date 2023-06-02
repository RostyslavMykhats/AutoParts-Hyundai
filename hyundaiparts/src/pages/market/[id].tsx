import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/store/features/cart";
import { Col, Container, Row } from "react-bootstrap";
import s from "./single.module.scss";
import ButtonUi from "@/components/button";

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5" style={{
      minHeight:'80vh'
    }}>
      <Container>
        <Row>
          <Col xs={12}>
            <div className={`d-flex align-items-center justigy-content-around gap-5 m-5 ${s.section}`}>
              <img
                className={s.image}
                src={product.image}
                alt={product.title}
              />
              <div className={`d-flex flex-column gap-4 `}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <h3>{product.price} $</h3>
                <ButtonUi onClick={handleAddToCart}>Buy</ButtonUi>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleProductPage;
