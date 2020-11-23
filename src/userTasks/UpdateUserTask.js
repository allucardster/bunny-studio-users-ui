import { readUserTaskAction, updateUserTaskAction } from '../api/actions/userTask';
import { useMutation, useQuery } from 'react-fetching-library';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage} from 'formik';

function UpdateUserTask (props) {
  const { callback } = props;
  const { mutate: mutatedUpdateUserTaskAction } = useMutation(updateUserTaskAction);
  const history = useHistory();
  const { userId, userTaskId } = useParams(); 
  const [initialValues, setInitialValues] = useState({
    description: '',
    state: '',
    user: {
      id: '',
      name: ''
    }
  });
  const { loading, error, payload } = useQuery(
    readUserTaskAction(userId, userTaskId)
  );

  useEffect(() => {
    if (payload) {
      setInitialValues({...payload});
    }
  }, [payload]);

  if (loading) {
    return (
      <Modal show backdrop="static" keyboard={false} animation={false}>
        <Modal.Body>
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  if (error) {
    console.log('Unable to load user');
  }

  const validate = values => {
    const errors = {};

    if (!values.description) {
      errors.description = 'Required';
    }

    if (!values.state) {
      errors.state = 'Required';
    }

    return errors;
  }

  const handleClose = () => {
    history.goBack();
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const { error } = await mutatedUpdateUserTaskAction(userId, userTaskId, values);

    if (error) {
      console.log('Unable to update user task');
      return;
    }

    callback(values);
    setSubmitting(false);
    handleClose();
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
      <Modal show backdrop="static" keyboard={false} animation={false} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update User Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="form-group">
              <label htmlFor="user_task_description">Description</label>
              <Field
                component="textarea"
                type="text"
                id="user_task_description"
                name="description"
                className={errors.description && touched.description ? 'form-control is-invalid' : 'form-control' } 
              />
              <ErrorMessage name="description" className="text-danger" component="div" />
            </div>
            <div className="form-group">
              <select
                className={errors.state && touched.state ? 'custom-select is-invalid' : 'custom-select' }
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Task State</option>
                <option value="to do">To Do</option>
                <option value="done">Done</option>
              </select>
              {errors.state && touched.state &&
        <div className="text-danger">
          {errors.state}
        </div>}
            </div>
            <Button variant="secondary" disabled={isSubmitting} onClick={handleClose}>
              Cancel
            </Button>
            { ' ' }
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      )}
    </Formik>
  );
}

export default UpdateUserTask;