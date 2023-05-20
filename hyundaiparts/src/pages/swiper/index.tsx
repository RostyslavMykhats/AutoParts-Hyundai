import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "./swiper.module.scss";
import { Container, Row, Col } from "react-bootstrap";

const pageSwiper = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xxl={12}>
            <div>
              <div className="d-flex justify-content-center ">Swiper</div>
              <div className={s.card}>
                <div className={s.card__content}>
                  <h2 className={s.card__title}>Card title</h2>
                  <p className={s.card__text}>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" className={s.card__link}>
                    Card link
                  </a>
                  <a href="#" className={s.card__link}>
                    Another link
                  </a>
                </div>
              </div>
            </div>
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
            </Swiper>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default pageSwiper;
