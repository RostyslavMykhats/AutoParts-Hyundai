import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/store/features/cart";
import { Col, Container, Row } from "react-bootstrap";
import s from "./single.module.scss";
import ButtonUi from "@/components/button";
import Popup from "@/components/Popup";
import trash from "@/pages/cart/Trash.png";
import Image from "next/image";

interface Product {
  title: string;
  image: string;
  description: string;
  price: number;
  id: number;
}

interface RootState {
  cart: {
    items: { product: Product; quantity: number }[];
  };
}

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [showPopup, setShowPopup] = useState(false); // стан для відображення попапу
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setShowPopup(true); // Встановлюємо значення стану на true при натисканні кнопки
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId)); // Видалити товар з кошика за його ідентифікатором
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    // Диспетчеризуємо дію updateCartItemQuantity для оновлення кількості товару в кошику
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

  const handleIncrementQuantity = (productId: number) => {
    // Знаходимо товар за його ідентифікатором
    const item = cartItems.find((item) => item.product.id === productId);
    if (item) {
      // Якщо товар знайдено, збільшуємо його кількість на 1 і викликаємо handleQuantityChange для оновлення кількості
      const newQuantity = item.quantity + 1;
      handleQuantityChange(productId, newQuantity);
    }
  };

  const handleDecrementQuantity = (productId: number) => {
    // Знаходимо товар за його ідентифікатором
    const item = cartItems.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      // Якщо товар знайдено і його кількість більша за 1, зменшуємо його кількість на 1 і викликаємо handleQuantityChange для оновлення кількості
      const newQuantity = item.quantity - 1;
      handleQuantityChange(productId, newQuantity);
    }
  };

  return (
    <div className="mt-5" style={{ minHeight: "80vh" }}>
      <Container>
        <Row>
          <Col xs={12}>
            <div
              className={`d-flex align-items-center justify-content-around gap-5 m-5 ${s.section}`}
            >
              <img
                className={s.image}
                src={product.image}
                alt={product.title}
              />
              <div className={`d-flex flex-column gap-4`}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <h3>{product.price} $</h3>
                <div className={s.quantity}>
                  {cartItems.map((item) => {
                    if (item.product.id === product.id) {
                      return (
                        <div className="d-flex gap-4">
                          <div
                            key={item.product.id}
                            className={s.quantity__btns}
                          >
                            <button
                              className={s.quantity__btn}
                              onClick={() =>
                                handleDecrementQuantity(item.product.id)
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className={s.quantity__btn}
                              onClick={() =>
                                handleIncrementQuantity(item.product.id)
                              }
                            >
                              +
                            </button>
                          </div>{" "}
                          <button
                            className={s.delete}
                            onClick={() =>
                              handleRemoveFromCart(item.product.id)
                            }
                          >
                            <Image src={trash} alt="delete" />
                          </button>
                        </div>
                      );
                    }
                  })}
                </div>
                <button
                  style={{
                    width: "100%",
                    height: "50px",
                    background: "#FF8F28",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  onClick={handleAddToCart}
                >
                  Buy
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default SingleProductPage;
