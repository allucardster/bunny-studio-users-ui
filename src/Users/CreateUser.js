import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function CreateUser() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    history.goBack();
  }

  const handleSubmit = () => {
    setLoading(true);
  }

  return (
    <Modal show backdrop="static" keyboard={false} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Form here!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={loading} onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" disabled={loading} onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateUser;