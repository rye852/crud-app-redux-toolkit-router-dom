import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';

const mainLayOut = () => {
  return (
    <>
      <Container>
        <Header />
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default mainLayOut;
