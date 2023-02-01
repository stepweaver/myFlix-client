import { Button, Col } from 'react-bootstrap';

export const DeleteUser = ({ storedToken, storedUser }) => {
  const handleDeregister = () => {
    const userWarning = confirm(
      `Confirm: Permanently delete profile?`
    );

    userWarning === false
    ? alert('Profile not deleted')
    : fetch(`https://cthulhuflix.onrender.com/users/${storedUser.username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      if (response.ok) {
        alert('Profile DELETED. Dave\'s not here!');
        localStorage.clear();
        window.location.reload();
      } else {
        alert('Something went wrong');
      }
    })
    .catch((e) => {
      console.log(e);
    });
  };

  return (
    <Col md={5} className='text-end px-4'>
      <div>
        <Button
          onClick={() => handleDeregister(storedUser._id)}
          className='button-delete'
          variant='danger'
        >
          Delete Profile
        </Button>
      </div>
    </Col>
  );
};