import React from 'react';
import { Row, Col, Card, CardGroup } from 'react-bootstrap';
import moment from 'moment';

export const UserInfo = ({ user }) => {
  let userBirthday = moment.utc(user.birth).format('MM/DD/YYYY');

  return (
    <Row>
      <Col className='text-start mb-5'>
        <CardGroup>
          <Card className='bg-transparent mt-5 mb-5'>
            <Card.Title className='mb-4 text-uppercase fs-4'>User Info</Card.Title>
            <Card.Text className='fs-5'>Username: {user.username}</Card.Text>
            <Card.Text className='fs-5'>Email: {user.email}</Card.Text>
            <Card.Text className='fs-5'>Birthday: {userBirthday}</Card.Text>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
};