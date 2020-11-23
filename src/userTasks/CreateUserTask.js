import { useMutation } from 'react-fetching-library';
import { useHistory, useParams } from 'react-router-dom';
import { createUserTaskAction } from '../api/actions/userTask';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage} from 'formik';

function CreateUserTask(props) {
  const { callback } = props;
  const { mutate: mutatedCreateUserTaskAction } = useMutation(createUserTaskAction);
  const history = useHistory();
  const { userId } = useParams();
  const initialValues = {
    description: '',
    state: ''
  };

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
    const { error, payload: userTask } = await mutatedCreateUserTaskAction(userId, values);

    if (error) {
      console.log('Unable to create user task');
      return;
    }

    callback(userTask);
    setSubmitting(false);
    handleClose();
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
      <Modal show backdrop="static" keyboard={false} animation={false} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create User Task</Modal.Title>
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

export default CreateUserTask;