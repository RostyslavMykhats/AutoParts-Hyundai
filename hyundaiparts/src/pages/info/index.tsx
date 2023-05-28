import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Bunner from "./Banner.png";
import Image from "next/image";
import s from "./info.module.scss";
import Hyundai from "./hyundaiLogo.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

const info = () => {
  return (
    <>
      <div>
        <Image style={{ width: "100%" }} src={Bunner} alt="Bunner" />
      </div>

      <section className={s.info}>
        <Container>
          <Row>
            <Col xs={12}>
              <Swiper
                style={{ margin: "40px 0" }}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <div className={s.slide}>
                    <h4>What is H’Parts</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum convallis mi ut velit porttitor placerat. Nulla
                      egestas mattis magna, ut luctus ligula mollis sit amet.
                      Nam vitae leo dignissim, sollicitudin eros in, consequat
                      neque. Suspendisse potenti. Quisque in est mauris. Nullam
                      ut sollicitudin ligula.Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Vestibulum convallis mi ut
                      velit porttitor placerat. Nulla egestas mattis magna, ut
                      luctus ligula mollis sit amet. Nam vitae leo dignissim,
                      sollicitudin eros in, consequat neque. Suspendisse
                      potenti. Quisque in est mauris. Nullam ut sollicitudin
                      ligula.Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Vestibulum convallis mi ut velit porttitor placerat.
                      Nulla egestas mattis magna, ut luctus ligula mollis sit
                      amet. Nam vitae leo dignissim, sollicitudin eros in,
                      consequat neque. Suspendisse potenti. Quisque in est
                      mauris. Nullam ut sollicitudin ligula.
                    </p>
                    <Image
                      style={{
                        width: "110px",
                        height: "85px",
                        objectFit: "cover",
                      }}
                      src={Hyundai}
                      alt="hyundaiLogo"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={s.slide}>
                    <h4>How it Works</h4>
                    <h6>STEP 1:</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum convallis mi ut velit porttitor placerat. Nulla
                      egestas mattis magna, ut luctus ligula mollis sit amet.
                      Nam vitae leo dignissim, sollicitudin eros in, consequat
                      neque. Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Vestibulum convallis mi ut velit porttitor placerat.
                      Nulla egestas mattis magna, ut luctus ligula mollis sit
                      amet. Nam vitae leo dignissim.
                    </p>
                    <h6>STEP 2:</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum convallis mi ut velit porttitor placerat. Nulla
                      egestas mattis magna, ut luctus ligula mollis sit amet.
                      Nam vitae leo dignissim, sollicitudin eros in, consequat
                      neque. Suspendisse potenti. Quisque in est mauris. Nullam
                      ut soll.
                    </p>
                    <h6>STEP 3:</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum convallis mi ut velit porttitor placerat. Nulla
                      egestas mattis magna, ut luctus ligula mollis sit amet.
                      Nam vitae leo dignissim, sollicitudin eros in, consequat
                      neque. Suspendisse potenti. Quisque in est mauris.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={s.slide}>
                    <h4>About us</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum convallis mi ut velit porttitor placerat. Nulla
                      egestas mattis magna, ut luctus ligula mollis sit amet.
                      Nam vitae leo dignissim, sollicitudin eros in, consequat
                      neque. Suspendisse potenti. Quisque in est mauris. Nullam
                      ut sollicitudin ligula.Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Vestibulum convallis mi ut
                      velit porttitor placerat. Nulla egestas mattis magna, ut
                      luctus ligula mollis sit amet. Nam vitae leo dignissim,
                      sollicitudin eros in, consequat neque. Suspendisse
                      potenti. Quisque in est mauris. Nullam ut sollicitudin
                      ligula.Lorem ipsum dolor sit amet, consectetur adipiscing
                      elit. Vestibulum convallis mi ut velit porttitor placerat.
                      Nulla egestas mattis magna, ut luctus ligula mollis sit
                      amet. Nam vitae leo dignissim, sollicitudin eros in,
                      consequat neque. Suspendisse potenti. Quisque in est
                      mauris. Nullam ut sollicitudin ligula.
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default info;
