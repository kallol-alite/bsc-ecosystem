import React from "react";
import { Col, Container, Row } from "reactstrap";
import Navbar from "./Navbar/Index";
import Sidebar from './Sidebar/Index';
export default function Index() {
  return (
    <div>
      
        <Row>          
          <Col md="12" xs="12" className="px-0">            
            <Navbar />
          </Col>         
        </Row>
        <Row>
        <Col md="2" xs="3" className="px-0">
            <Sidebar />
          </Col>
        </Row>
     
    </div>
  );
}
