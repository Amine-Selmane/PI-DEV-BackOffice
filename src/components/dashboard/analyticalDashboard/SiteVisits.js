import React from 'react';
import { Row, Col, Progress } from 'reactstrap';
import { VectorMap } from 'react-jvectormap';
import '../../../views/maps/VectorMap.css';
import DashCard from '../dashboardCards/DashCard';

const SiteVisits = () => {
  return (
    <DashCard title="Site Visits">
      <Row>
        <Col lg="8">
          <VectorMap
            map="world_mill"
            backgroundColor="transparent"
            zoomOnScroll={false}
            containerStyle={{
              width: '100%',
              height: '375px',
            }}
            markers={[
              {
                latLng: [-24.27, 133.77],
                name: 'Australia',
                style: { r: 6, fill: '#e46a76', stroke: 0 },
              },
              {
                latLng: [20.59, 78.96],
                name: 'India',
                style: { r: 6, fill: '#03a9f3', stroke: 0 },
              },
              {
                latLng: [61.52, 105.31],
                name: 'Russia',
                style: { r: 6, fill: '#fb9678', stroke: 0 },
              },
              {
                latLng: [46.22, 2.21],
                name: 'France',
                style: { r: 6, fill: '#00c292', stroke: 0 },
              },
              {
                latLng: [37.09, -105.71],
                name: 'United States',
                style: { r: 6, fill: '#fec107', stroke: 0 },
              },
            ]}
            containerClassName="map"
            regionStyle={{
              initial: {
                fill: 'rgba(0,0,0,0.12)',
                'fill-opacity': 1,
                'stroke-color': '#000',
                'stroke-width': 1,
                'stroke-opacity': 0.5,
              },
            }}
          />
        </Col>
        <Col lg="4">
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 justify-content-between">
              <div>
                <h6 className="mb-0 fw-medium">From India</h6>
                <span className="text-muted">48%</span>
              </div>
              <h2 className="ms-auto text-end">6350</h2>
            </div>
            <Progress value="48" color="info" />
          </div>
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 justify-content-between">
              <div>
                <h6 className="mb-0 fw-medium">From Russia</h6>
                <span className="text-muted">98%</span>
              </div>
              <h2 className="ms-auto text-end">9654</h2>
            </div>
            <Progress value="98" color="primary" />
          </div>
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 justify-content-between">
              <div>
                <h6 className="mb-0 fw-medium">From United States</h6>
                <span className="text-muted">25%</span>
              </div>
              <h2 className="ms-auto text-end">4582</h2>
            </div>
            <Progress value="25" color="warning" />
          </div>
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 justify-content-between">
              <div>
                <h6 className="mb-0 fw-medium">From Autralia</h6>
                <span className="text-muted">87%</span>
              </div>
              <h2 className="ms-auto text-end">7530</h2>
            </div>
            <Progress value="87" color="danger" />
          </div>
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 justify-content-between">
              <div>
                <h6 className="mb-0 fw-medium">From France</h6>
                <span className="text-muted">65%</span>
              </div>
              <h2 className="ms-auto text-end">6320</h2>
            </div>
            <Progress value="65" color="success" />
          </div>
        </Col>
      </Row>
    </DashCard>
  );
};

export default SiteVisits;
