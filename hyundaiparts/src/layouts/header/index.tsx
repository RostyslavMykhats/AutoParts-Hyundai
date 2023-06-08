import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// styles
import s from "./index.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import logo from "./Logo.png";
import Search from "@/components/Search";
import Cart from "@/components/cart";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={s.header}>
        <ul className={`d-flex gap-5 ${s.nav}`}>
          <Container>
            <Row className="d-flex align-items-center justify-content-between flex-wrap">
              <Col xs={2} className="d-flex justify-content-start">
                <Link href="/" onClick={closeMenu}>
                  <Image className={s.header__logo} src={logo} alt="H'PARTS" />
                </Link>
              </Col>
              <Col xs={4} className="d-flex justify-content-end">
                <div className={`${s.searchdesc}`}>
                  <Search />
                </div>
              </Col>
              <Col
                xs={4}
                className={`d-flex justify-content-end align-items-center ${
                  isOpen ? s.mobile : ""
                } ${s.nav_desc}`}
              >
                <ul className={`${s.nav}`}>
                  <li>
                    <Link
                      className={s.nav__item}
                      href="/market"
                      onClick={closeMenu}
                    >
                      MARKET
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={s.nav__item}
                      href="/sell"
                      onClick={closeMenu}
                    >
                      SELL
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={s.nav__item}
                      href="/info"
                      onClick={closeMenu}
                    >
                      INFO
                    </Link>
                  </li>
                  <li>
                    <div className={s.line}></div>
                  </li>
                </ul>
              </Col>
              <Col xs={2} className={`d-flex justify-content-end`}>
                <Cart />
              </Col>
              <Col xs={2}>
                <div className={s.burger} onClick={toggleMenu}>
                  <div
                    className={`${s.line} ${
                      isOpen ? s.line1 + " " + s.active : ""
                    }`}
                  ></div>
                  <div
                    className={`${s.line} ${
                      isOpen ? s.line2 + " " + s.active : ""
                    }`}
                  ></div>
                  <div
                    className={`${s.line} ${
                      isOpen ? s.line3 + " " + s.active : ""
                    }`}
                  ></div>
                </div>
              </Col>
            </Row>
            {isOpen && (
              <Row className="d-flex align-items-center justify-content-center">
                <Col xs={12}>
                  <ul className={`d-flex ${s.nav} ${s.mobile}`}>
                    <li>
                      <Search />
                    </li>
                    <li>
                      <Link
                        className={s.nav__item}
                        href="/market"
                        onClick={closeMenu}
                      >
                        MARKET
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={s.nav__item}
                        href="/sell"
                        onClick={closeMenu}
                      >
                        SELL
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={s.nav__item}
                        href="/info"
                        onClick={closeMenu}
                      >
                        INFO
                      </Link>
                    </li>
                  </ul>
                </Col>
              </Row>
            )}
          </Container>
        </ul>
      </header>
    </>
  );
};

export default Header;
