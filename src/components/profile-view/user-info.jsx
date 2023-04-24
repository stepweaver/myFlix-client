import React from 'react';
import { Row, Col, Card, CardGroup } from 'react-bootstrap';

import './user-info.scss';

export const UserInfo = ({ user }) => {

  return (
    <Col className='text-start mt-3'>
      <h2 className='user-info text-uppercase fs-3'>User Info</h2>
      <p className='fs-5 mt-3'>
        Username: {user.username}<br/>
        Email: {user.email}
      </p>
    </Col>
  );
};