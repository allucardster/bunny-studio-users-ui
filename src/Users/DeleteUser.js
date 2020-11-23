import { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { deleteUserAction } from '../api/actions/user';
import { useMutation } from 'react-fetching-library';
import { Modal, Button } from 'react-bootstrap';

function DeleteUser(props) {
  const [loading, setLoading] = useState(false);
  const { callback } = props;
  const { mutate: mutatedDeleteUserAction } = useMutation(deleteUserAction);
  const history = useHistory();
  const { userId } = useParams();

  const handleClose = () => {
    history.goBack();
  }

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await mutatedDeleteUserAction(userId);

    if (error) {
      console.log('Unable to delete user');
      return;
    }

    callback(userId);
    setLoading(false);
    handleClose();
  }

  return (
    <Modal show backdrop="static" keyboard={false} animation={false}>
      <Modal.Header>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure want to permanently remove this user?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={loading} onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" disabled={loading} onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUser;