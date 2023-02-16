import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

export const UserInfo = ({ user }) => {
  let userBirthday = moment.utc(user.birth).format('MM/DD/YYYY');

  return (
    <Row className='d-flex flex-column flex-lg-row ms-2 text-leg-center mt-lg-3 mt-3'>
      <Col>
        <span>Username: </span>
        <span className='fw-bolder'>{user.username}</span>
      </Col>
      <Col>
        <span>Email: </span>
        <span className='fw-bolder'>{user.email}</span>
      </Col>
      <Col>
        <span>Birthday: </span>
        <span className='fw-bolder'>{userBirthday}</span>
      </Col>
    </Row>
  );
};