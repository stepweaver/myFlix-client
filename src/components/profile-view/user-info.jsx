import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

export const UserInfo = ({ user }) => {
  let userBirthday = moment.utc(user.birth).format('MM/DD/YYYY');

  return (
    <Row className='bg-transparent d-flex flex-lg-row ms-2 text-lg-center mt-lg-2 mt-2 mb-3'>
      <Col>
        <span className='text-muted'>Username: </span>
        <span>{user.username}</span>
      </Col>
      <Col>
        <span className='text-muted'>Email: </span>
        <span>{user.email}</span>
      </Col>
      <Col>
        <span className='text-muted'>Birthday: </span>
        <span>{userBirthday}</span>
      </Col>
      <hr className='mt-3' />
    </Row>
  );
};