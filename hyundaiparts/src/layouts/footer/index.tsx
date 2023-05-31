import React from "react";
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
  return (
    <>
      <footer className={s.footer}>
        <Container>
          <Row>
            <Col xs={6}>
              <ul>
                <li className={s.footer__logo}><Image src={Logo} alt="H'PARTS"/></li>
                <li className={s.footer__contact}><Link href="https://maps.app.goo.gl/wch5xSSMzuajH3hd8"><Image src={Location} alt="Location"/>Борислав, Дрогобицька 89</Link></li>
                <li className={s.footer__contact}><Link type="tel" href="+380634916230"><Image src={Phone} alt="Phone"/>+380634916230</Link></li>
                <li className={s.footer__contact}><Link type="email" href="mirosrik@gmail.com"><Image src={Mail} alt="Mail"/>mirosrik@gmail.com</Link></li>
              </ul>
            </Col>
            <Col className="d-flex flex-column" xs={6}>
             <h3>Give Us Your Feedback!</h3>
             <p>H’Parts is a growing community and we are actively looking for feedback from you! Growth and improvement is our top priority.</p>
             <textarea name="" id="" cols="50" rows="2" placeholder="Type your message here"></textarea>
              <ButtonUi>SEND MESSAGE</ButtonUi>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
