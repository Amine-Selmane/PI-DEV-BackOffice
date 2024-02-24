import { Row, Col, Card, Progress, CardBody } from 'reactstrap';
import * as Icon from 'react-feather';

const revenues = [
  {
    id: 1,
    icon: Icon.Users,
    title: 'My New Clients',
    earn: '23',
    color: 'primary',
  },
  {
    id: 2,
    icon: Icon.Edit,
    title: 'New Projects',
    earn: '56',
    color: 'cyan',
  },
  {
    id: 3,
    icon: Icon.FileText,
    title: 'New Invoices',
    earn: '95',
    color: 'purple',
  },
  {
    id: 4,
    icon: Icon.ShoppingBag,
    title: 'All Projects',
    earn: '86',
    color: 'warning',
  },
];

const RevenueCards = () => {
  return (
    <Card>
      <Row>
        {revenues.map((item) => (
          <Col lg="3" md="6" className="border-end" key={item.id}>
            <CardBody>
              <div className="d-flex align-items-center">
                <div>
                  <item.icon className="text-dark" />
                  <p className="mb-3 mt-2 font-weight-bold fs-6 text-muted">
                    {item.title}
                  </p>
                </div>

                <div className="ms-auto">
                  <h2 className={`text-${item.color}`}>{item.earn}</h2>
                </div>
              </div>

              <Progress value={item.earn} color={item.color} />
            </CardBody>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default RevenueCards;
