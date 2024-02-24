import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Modal,
  ModalHeader,
} from 'reactstrap';


import img1 from '../../assets/images/bg/bg1.jpg';
import img2 from '../../assets/images/bg/bg2.jpg';
import img3 from '../../assets/images/bg/bg3.jpg';
import img4 from '../../assets/images/bg/bg4.jpg';
import img8 from '../../assets/images/background/img5.jpg';
import img9 from '../../assets/images/background/img5.png';

const Gallery = () => {
  const [modal, setModal] = useState({
    m1:false,
    m2:false,
    m3:false,
    m4:false,
    m5:false,
    m6:false,
    m7:false,
    m8:false,
    m9:false,
    m10:false,
    m11:false,
    m12:false,
    m13:false,
    m14:false,
    m15:false,
  })
  
  

  return (
    <>
      
      <Row>
        <Col xs="12" lg="3">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img1}
              alt="Card image cap"
              onClick={()=>{setModal({m1: !modal.m1})}}
            />
            <Modal isOpen={modal.m1} toggle={()=>{setModal({m1: !modal.m1})}}>
              <ModalHeader toggle={()=>{setModal({m1: !modal.m1})}}>Image 1</ModalHeader>
              <img src={img1} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" lg="3">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img2}
              alt="Card image cap"
              onClick={()=>{setModal({m2: !modal.m2})}}
            />
            <Modal isOpen={modal.m2} toggle={()=>{setModal({m2: !modal.m2})}}>
              <ModalHeader toggle={()=>{setModal({m2: !modal.m2})}}>Image 1</ModalHeader>
              <img src={img2} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" lg="3">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img3}
              alt="Card image cap"
              onClick={()=>{setModal({m3: !modal.m3})}}
            />
            <Modal isOpen={modal.m3} toggle={()=>{setModal({m3: !modal.m3})}}>
              <ModalHeader toggle={()=>{setModal({m3: !modal.m3})}}>Image 1</ModalHeader>
              <img src={img3} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" lg="3">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img4}
              alt="Card image cap"
              onClick={()=>{setModal({m4: !modal.m4})}}
            />
            <Modal isOpen={modal.m4} toggle={()=>{setModal({m4: !modal.m4})}}>
              <ModalHeader toggle={()=>{setModal({m4: !modal.m4})}}>Image 1</ModalHeader>
              <img src={img4} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" lg="3">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img2}
              alt="Card image cap"
              onClick={()=>{setModal({m5: !modal.m5})}}
            />
            <Modal isOpen={modal.m5} toggle={()=>{setModal({m5: !modal.m5})}}>
              <ModalHeader toggle={()=>{setModal({m5: !modal.m5})}}>Image 1</ModalHeader>
              <img src={img2} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" lg="3">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img3}
              alt="Card image cap"
              onClick={()=>{setModal({m6: !modal.m6})}}
            />
            <Modal isOpen={modal.m6} toggle={()=>{setModal({m6: !modal.m6})}}>
              <ModalHeader toggle={()=>{setModal({m6: !modal.m6})}}>Image 1</ModalHeader>
              <img src={img3} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" lg="3">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img4}
              alt="Card image cap"
              onClick={()=>{setModal({m7: !modal.m7})}}
            />
            <Modal isOpen={modal.m7} toggle={()=>{setModal({m7: !modal.m7})}}>
              <ModalHeader toggle={()=>{setModal({m7: !modal.m7})}}>Image 1</ModalHeader>
              <img src={img4} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" lg="3">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img1}
              alt="Card image cap"
              onClick={()=>{setModal({m8: !modal.m8})}}
            />
            <Modal isOpen={modal.m8} toggle={()=>{setModal({m8: !modal.m8})}}>
              <ModalHeader toggle={()=>{setModal({m8: !modal.m8})}}>Image 1</ModalHeader>
              <img src={img1} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
       </Row>
       <h4 className="mb-5 mt-4">Other Gallery</h4>
       <Row>
        <Col md="6" lg="4">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img1}
              alt="Card image cap"
              onClick={()=>{setModal({m9: !modal.m9})}}
            />
            <Modal isOpen={modal.m9} toggle={()=>{setModal({m9: !modal.m9})}}>
              <ModalHeader toggle={()=>{setModal({m9: !modal.m9})}}>Image 7</ModalHeader>
              <img src={img1} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img3}
              alt="Card image cap"
              onClick={()=>{setModal({m10: !modal.m10})}}
            />
            <Modal isOpen={modal.m10} toggle={()=>{setModal({m10: !modal.m10})}}>
              <ModalHeader toggle={()=>{setModal({m10: !modal.m10})}}>Image 3</ModalHeader>
              <img src={img3} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img9}
              alt="Card image cap"
              onClick={()=>{setModal({m11: !modal.m11})}}
            />
            <Modal isOpen={modal.m11} toggle={()=>{setModal({m11: !modal.m11})}}>
              <ModalHeader toggle={()=>{setModal({m11: !modal.m11})}}>Image 9</ModalHeader>
              <img src={img9} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img4}
              alt="Card image cap"
              onClick={()=>{setModal({m12: !modal.m12})}}
            />
            <Modal isOpen={modal.m12} toggle={()=>{setModal({m12: !modal.m12})}}>
              <ModalHeader toggle={()=>{setModal({m12: !modal.m12})}}>Image 4</ModalHeader>
              <img src={img4} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img9}
              alt="Card image cap"
              onClick={()=>{setModal({m13: !modal.m13})}}
            />
            <Modal isOpen={modal.m13} toggle={()=>{setModal({m13: !modal.m13})}}>
              <ModalHeader toggle={()=>{setModal({m13: !modal.m13})}}>Image 9</ModalHeader>
              <img src={img9} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img8}
              alt="Card image cap"
              onClick={()=>{setModal({m14: !modal.m14})}}
            />
            <Modal isOpen={modal.m14} toggle={()=>{setModal({m14: !modal.m14})}}>
              <ModalHeader toggle={()=>{setModal({m14: !modal.m14})}}>Image 8</ModalHeader>
              <img src={img8} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
          <Card>
            <CardImg
            className="cursor-pointer"
              top
              width="100%"
              src={img3}
              alt="Card image cap"
              onClick={()=>{setModal({m15: !modal.m15})}}
            />
            <Modal isOpen={modal.m15} toggle={()=>{setModal({m15: !modal.m15})}}>
              <ModalHeader toggle={()=>{setModal({m15: !modal.m15})}}>Image 6</ModalHeader>
              <img src={img3} alt="" width="100%" className="pb-3" />
            </Modal>
            <CardBody className="text-center">
              <CardTitle tag="h4" className="mb-1">
                Project title
              </CardTitle>
              <CardSubtitle className="text-muted mb-0">subtitle of project</CardSubtitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Gallery;
