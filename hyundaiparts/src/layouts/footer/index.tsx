import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Logo from "./Logo.png";
import Location from "./location.png";
import Link from "next/link";
import Phone from "./Phone.png";
import Mail from "./mail.png";
// styles
import s from "./index.module.scss";
import ButtonUi from "@/components/button";

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false); // Стан для відображення/приховування попапу
  const [message, setMessage] = useState(""); // Стан для збереження вмісту текстового поля

  const handleSendMessage = () => {
    // Код для відправки повідомлення або збереження його в базі даних
    setShowPopup(true); // Показати попап після натискання на кнопку "SEND"
    setMessage(""); // Очистити текстове поле
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value); // Оновити стан `message` змінюючи вміст текстового поля
  };

  return (
    <>
      <footer className={s.footer}>
        <Container>
          <Row>
            <Col xs={12} sm={6}>
              <ul className="mb-5">
                <li className={s.footer__logo}>
                  <Image src={Logo} alt="H'PARTS" />
                </li>
                <li className={s.footer__contact}>
                  <Link href="https://maps.app.goo.gl/wch5xSSMzuajH3hd8">
                    <Image src={Location} alt="Location" />
                    Борислав, Дрогобицька 89
                  </Link>
                </li>
                <li className={s.footer__contact}>
                  <Link type="tel" href="+380634916230">
                    <Image src={Phone} alt="Phone" />
                    +380634916230
                  </Link>
                </li>
                <li className={s.footer__contact}>
                  <Link type="email" href="mirosrik@gmail.com">
                    <Image src={Mail} alt="Mail" />
                    mirosrik@gmail.com
                  </Link>
                </li>
              </ul>
            </Col>
            <Col className="d-flex flex-column" xs={12} sm={6}>
              <h3>Give Us Your Feedback!</h3>
              <p>
                H’Parts is a growing community and we are actively looking for
                feedback from you! Growth and improvement is our top priority.
              </p>
              <textarea
                name=""
                id=""
                cols="50"
                rows="2"
                placeholder="Type your message here"
                value={message}
                onChange={handleMessageChange}
              ></textarea>
              <ButtonUi onClick={handleSendMessage}>SEND MESSAGE</ButtonUi>
            </Col>
          </Row>
        </Container>
      </footer>
      {showPopup && (
        <div className={s.popup_overlay}>
          <div className={s.popup}>
            <p>Your message has been sent!</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
