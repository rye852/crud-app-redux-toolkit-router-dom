import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
const Errore = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <div className="mt-5">
            <h1>OOh! an unexpected error has occurred.</h1>
            <p style={{ fontSize: '1.25em' }}>{error.statusText || error.status}</p>
            <Link to="/" style={{ fontSize: '1.25em' }}>
              You can find what you expected in our{' '}
              <span className="main-color">Home</span> Page
            </Link>
            <button
              onClick={() => navigate(-1, { replace: true })}
              type="button"
              class="d-block mt-5 m-auto btn btn-primary">
              Back
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Errore;
