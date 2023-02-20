import { Button, Col } from 'react-bootstrap';

export const DeleteUser = ({ storedToken, storedUser }) => {
  const handleDeregister = () => {
    const userWarning = confirm(
      `Confirm delete user profile?`
    );

    userWarning === false ? alert('User profile NOT deleted')
    : fetch(`https://cthulhuflix.onrender.com/users/${storedUser.username}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${storedToken}`,
      'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        alert('User profile DELETED');
        localStorage.clear();
        window.location.reload();
      } else {
        alert('Something went wrong');
      }
    })
    .catch((e) => console.log(e));
  };

  return (
    <Col md={5} className='text-end'>
      <div>
        <Button
          onClick={() => handleDeregister(storedUser._id)}
          className='button-delete mt-2'
          variant='danger'
        >
          Delete Profile
        </Button>
      </div>
    </Col>
  );
};