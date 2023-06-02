import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { RootState } from '@/store/index';
import s from './cart.module.scss';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <>
      <Container className='mt-5'>
        <Row>
          <Col xs={12} className='mt-5'>
            <h3 className={s.title}>MY SHOPPING BAG</h3>
            <p className={s.title__desc}>View current items in cart and finalize before checkout</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={8}>
            {cartItems.map((item) => (
              <div key={item.id}>
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
                <img src={item.image} alt={item.title} />
              </div>
            ))}
          </Col>
          <Col xs={12} lg={4}> 
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Cart;
