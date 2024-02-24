import React from 'react';
import { Row, Col } from 'reactstrap';
import * as Icon from 'react-feather';
import DashCard from '../dashboardCards/DashCard';

const CounterData = [
  {
    id: 1,
    title: 'New Clients',
    icon: Icon.Users,
    color: 'info',
    count: '20',
  },
  {
    id: 2,
    title: 'New Projects',
    icon: Icon.Folder,
    color: 'purple',
    count: '169',
  },
  {
    id: 3,
    title: 'Open Projects',
    icon: Icon.FolderMinus,
    color: 'primary',
    count: '311',
  },
  {
    id: 4,
    title: 'New Invoices',
    icon: Icon.FileText,
    color: 'success',
    count: '117',
  },
];

const CounterCard = () => {
  return (
    <Row>
      {CounterData.map((counter) => (
        <Col xs="12" md="6" key={counter.id}>
          <DashCard title={counter.title}>
            <div className="d-flex align-items-center mt-4 mb-3 pt-2">
              <counter.icon width={45} height={45} className={`text-${counter.color}`} />
              <div className="ms-auto">
                <h2 className='fs-1'>{counter.count}</h2>
              </div>
            </div>
          </DashCard>
        </Col>
      ))}
    </Row>
  );
};

export default CounterCard;
