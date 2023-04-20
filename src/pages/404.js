import Link from "next/link";
import Image from "next/image";
import { Col, Container, Row } from "reactstrap";

const Page404 = () => {
  return (
    <div>
      <section className="error-main">
        <ul className="page-decore">
          <li className="top">
            <Image
              className="img-fluid inner2"
              src="/images/landing/footer/2.png"
              alt="footer-back-img"
              width={265.36}
              height={271.4}
            />
          </li>
          <li className="bottom">
            <Image
              className="img-fluid inner2"
              src="/images/landing/footer/2.png"
              alt="footer-back-img"
              width={269.41}
              height={269.41}
            />
          </li>
        </ul>
        <Container>
          <Row>
            <Col sm="12">
              <div className="error-contain">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <h4>
                  The Page You Are Attempting To Reach Is Not Available.{" "}
                  <br></br>This May Be Because The Page Does Not Exist Or Has
                  Been Moved.
                </h4>
                <Link className="btn btn-primary" href="/">
                  back to home
                </Link>
                <div className="animated-bg">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Page404;
