import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <div className='px-5 py-3 mt-3 text-white ' style={{ backgroundColor: 'rgb(70, 50, 55)' }}>
      <Container>
        <Row className="">
          {/* Recreation, sports & fitness Section */}
          <Col md="3" sm="6">
            <h5>Recreation, sports & fitness</h5>
            <div className='d-flex flex-column align-content-start'>
            <p>Fitness & activities</p>
              <p>Intramural sports</p>
              <p>Facilities</p>
              <p>Registration & membership</p>
              <p>Camps & youth programs</p>
            </div>
            {/* <ul className="list-unstyled">
              <li>Fitness & activities</li>
              <li>Intramural sports</li>
              <li>Facilities</li>
              <li>Registration & membership</li>
              <li>Camps & youth programs</li>
            </ul> */}
          </Col>

          {/* Le Gym Section */}
          <Col md="3" sm="6">
            <h5>Le Gym</h5>
            <p>Sir George Williams Campus, Room EV-S2.206</p>
            <p>1515 Ste. Catherine St. W., Montreal, QC H3G 2W1</p>
            <p>Reception: 514-848-2424, ext. 3860</p>
            <p><a href="mailto:legym@concordia.ca" className="text-white">legym@concordia.ca</a></p>
          </Col>

          {/* Athletics Complex Section */}
          <Col md="3" sm="6">
            <h5>Athletics Complex</h5>
            <p>Loyola Campus, Room L RA 1.511</p>
            <p>7200 Sherbrooke St. W., Montreal, QC H4B 1R2</p>
            <p><a href="mailto:camprec@concordia.ca" className="text-white">camprec@concordia.ca</a></p>
            <p><a href="mailto:recreental@concordia.ca" className="text-white">recreental@concordia.ca</a></p>
          </Col>

          {/* Territorial Acknowledgement Section */}
          <Col md="3" sm="6">
            <h5>Territorial Acknowledgement</h5>
            <p>Concordia University is located on unceded Indigenous lands. The Kanien’kehá:ka Nation is recognized as the custodians of Tiohtià:ke/Montreal.</p>
          </Col>
        </Row>

        {/* Footer Bottom Section */}
       
      </Container>
    </div>
  );
};

export default Footer;
