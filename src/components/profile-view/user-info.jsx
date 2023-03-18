import React from 'react';
import { Row, Col, Card, CardGroup } from 'react-bootstrap';
import moment from 'moment';

export const UserInfo = ({ user }) => {

  return (
    <Row>
      <Col className='text-start mb-5'>
        <CardGroup>
          <Card className='bg-transparent mt-3 mb-5'>
            <Card.Title className='mb-4 text-uppercase fs-3'>User Info</Card.Title>
            <Card.Text className='fs-5 mt-5'>USERNAME: {user.username}</Card.Text>
            <Card.Text className='fs-5 mt-5'>EMAIL: {user.email}</Card.Text>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
};