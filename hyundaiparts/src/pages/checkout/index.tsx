import React from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { RootState } from "@/store/index";
import s from "./checkout.module.scss";
import Link from "next/link";
const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div style={{
        minHeight:'75vh'
    }}>
      <Container className="mt-5">
        <Row>
          <Col xs={12} className="mt-5">
            <h3 className={s.title}>Checkout</h3>
            <p className={s.title__desc}>
              Complete your purchase by providing the following information
            </p>
          </Col>
        </Row>
        <Row className="mt-4 mb-4">
          <Col xs={12} lg={8}>
            <div className={`d-flex flex-column ${s.products}`}>
              {cartItems.length > 0 ? (
                // Якщо в кошику є товари, відображаємо їх
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
                        {item.product.title} <span>{item.product.price}$</span>
                      </h6>
                      <p className="mt-3">{item.product.description}</p>
                      <div className={s.quantity}>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Якщо кошик порожній, відображаємо відповідне повідомлення
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
                  Items <span>{cartItems.length}</span>
                </p>
                <p className="d-flex justify-content-between">
                  Payment Method <span>Cash</span>
                </p>
              </div>
            </div>
            <Link href="/checkout">
              <button className={` mt-3 ${s.products__checkout}`}>
                PLACE ORDER{" "}
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
