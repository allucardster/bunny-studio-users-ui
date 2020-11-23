import { useState } from "react";
import { useMutation } from 'react-fetching-library';
import { deleteUserTaskAction } from '../api/actions/userTask';
import { useHistory, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function DeleteUserTask(props) {
  const [loading, setLoading] = useState(false);
  const { callback } = props;
  const { mutate: mutatedDeleteUserTask } = useMutation(deleteUserTaskAction);
  const history = useHistory();
  const { userId, userTaskId } = useParams();

  const handleClose = () => {
    history.goBack();
  }

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await mutatedDeleteUserTask(userId, userTaskId);

    if (error) {
      console.log('Unable to delete user task');
      return;
    }

    callback(userTaskId);
    setLoading(false);
    handleClose();
  }

  return (
    <Modal show backdrop="static" keyboard={false} animation={false}>
      <Modal.Header>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure want to permanently remove this user task?
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

export default DeleteUserTask;