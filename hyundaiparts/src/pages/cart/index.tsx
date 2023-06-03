import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { RootState } from "@/store/index";
import { removeFromCart, updateCartItemQuantity } from "@/store/features/cart";
import s from "./cart.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import trash from "./Trash.png";
import Image from "next/image";
import { addToCart } from "@/store/features/cart"; // Import the addToCart action

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cart");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      parsedCartItems.forEach((item) => {
        dispatch(addToCart(item.product)); // Dispatch the addToCart action for each item in the retrieved cart items
      });
    }
  }, []);

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));
  };

  const handleIncrementQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.product.id === productId);
    if (item) {
      const newQuantity = item.quantity + 1;
      handleQuantityChange(productId, newQuantity);
    }
  };

  const handleDecrementQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      handleQuantityChange(productId, newQuantity);
    }
  };

  const saveCartItemsToLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} className="mt-5">
          <h3 className={s.title}>My SHOPPING BAG</h3>
          <p className={s.title__desc}>
            View current items in cart and finalize before checkout{" "}
          </p>
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col xs={12} lg={8}>
          <div className={`d-flex flex-column ${s.products}`}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className={`d-flex align-items-center ${s.product}`}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className={s.product__image}
                  />
                  <div className={`${s.product__content}`}>
                    <h6 className="d-flex justify-content-between">
                      {item.product.title}{" "}
                      <span>{item.product.price}$</span>
                    </h6>
                    <p className="mt-3">{item.product.description}</p>
                    <div className={s.quantity}>
                      <button
                        className={s.quantity__btn}
                        onClick={() => handleDecrementQuantity(item.product.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className={s.quantity__btn}
                        onClick={() => handleIncrementQuantity(item.product.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className={s.product__btn}
                      onClick={() => handleRemoveFromCart(item.product.id)}
                    >
                      <Image src={trash} alt="delete" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your basket is empty.</p>
            )}
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div className={` ${s.products__price}`}>
            <div className={s.totalPrice}>
              <h4 className="d-flex justify-content-between">
                Total <span>{totalPrice.toFixed(2)}$</span>
              </h4>
              <p className="d-flex justify-content-between">
                Items <span>{cartItems.length}</span>{" "}
              </p>
            </div>
          </div>
          <Link href="/checkout">
            <button className={` mt-3 ${s.products__checkout}`}>
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
