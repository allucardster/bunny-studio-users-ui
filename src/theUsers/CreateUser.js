import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import { createUserAction } from '../api/actions/user';
import { useMutation } from 'react-fetching-library';

function CreateUser(props) {
  const { callback } = props;
  const { mutate: mutatedCreateUserAction } = useMutation(createUserAction);

  const history = useHistory();
  const initialValues = {
    name: ''
  };

  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  }

  const handleClose = () => {
    history.goBack();
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const { error, payload: user } = await mutatedCreateUserAction(values);

    if (error) {
      console.log('Unable to create user');
      return;
    }

    callback(user);
    setSubmitting(false);
    handleClose();
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
      <Modal show backdrop="static" keyboard={false} animation={false} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="form-group">
              <label htmlFor="user_name">Name</label>
              <Field
                type="text"
                id="user_name"
                name="name"
                className={errors.name && touched.name ? 'form-control is-invalid' : 'form-control' } 
              />
              <ErrorMessage name="name" className="text-danger" component="div" />
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

export default CreateUser;