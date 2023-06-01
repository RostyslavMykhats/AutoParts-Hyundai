import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/store/features/cart";
import Image from "next/image";
import SingleProduct from "@/components/singleProduct";
import { Col, Container, Row } from "react-bootstrap";

const SingleProductPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);

      const relatedResponse = await axios.get(
        `https://fakestoreapi.com/products/category/${response.data.category}`
      );
      const filteredProducts = relatedResponse.data.filter(
        (p) => p.id !== response.data.id
      );
      setRelatedProducts(filteredProducts.slice(0, 4));
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setShowPopup(true);
    }
  };

  const handleRemoveFromCart = () => {
    if (product) {
      dispatch(removeFromCart(product.id));
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5">
      <Container>
        <Row>
          <Col xs={12}>
            <div>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <h3>{product.price} USD</h3>
              <button onClick={handleAddToCart}>До кошика</button>
            </div>
          </Col>
          {/* Код попапу */}
          {showPopup && (
            <>
              <div onClick={() => setShowPopup(false)} />
              <div>
                <p>Товар в кошику</p>
                <button onClick={() => setShowPopup(false)}>Закрити</button>
              </div>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default SingleProductPage;
