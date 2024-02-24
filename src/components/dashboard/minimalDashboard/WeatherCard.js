import { Card, CardBody, Col, Row } from 'reactstrap';

const WeatherCard = () => {
  return (
    <Card className="bg-cyan">
      <CardBody>
        <Row>
          <Col xs="12" className="text-white text-end">
            <div>
              <i className="bi bi-cloud-drizzle fs-1"></i>
            </div>

            <span className="">SUNNEY DAY</span>
            <p className="op-5">April 14</p>
          </Col>
          <Col xs="12" className="text-white">
            <div className="display-4 mt-n5">
              73<sup>°F</sup>
            </div>
            <p>AHMEDABAD, INDIA</p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default WeatherCard;
