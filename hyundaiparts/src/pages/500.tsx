import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const errorFiveHundred = () => {
  return (
    <>
      <Container>
        <Row>
          <Col
            style={{
              minHeight: "75vh",
            }}
            xs={12}
            className="d-flex align-items-center justify-content-center"
          >
            <h1
              style={{
                color: "grey",
                textAlign:'center',
                fontSize:'80px',
                border:'2px solid silver ',
                borderRadius:'25px',
                padding:'100px 40px'
              }}
            >
              500 <br /> <span style={{
                fontSize:'40px'
              }}>PAGE NOT FOUND</span>
            </h1>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default errorFiveHundred;
