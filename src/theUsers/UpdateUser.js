import { useState, useEffect } from "react";
import { readUserAction, updateUserAction } from '../api/actions/user';
import { useMutation, useQuery } from 'react-fetching-library';
import { useHistory, useParams } from 'react-router-dom';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage} from 'formik';

function UpdateUser(props) {
  const { callback } = props;
  const { mutate: mutatedUpdateUserAction } = useMutation(updateUserAction);
  const history = useHistory();
  const { userId } = useParams();
  const [initialValues, setInitialValues] = useState({name: ''});
  const { loading, error, payload } = useQuery(
    readUserAction(userId)
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
    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  }

  const handleClose = () => {
    history.goBack();
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const { error } = await mutatedUpdateUserAction(userId, values);

    if (error) {
      console.log('Unable to update user');
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
      {({ errors, touched, isSubmitting }) => (
      <Modal show backdrop="static" keyboard={false} animation={false} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update User</Modal.Title>
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

export default UpdateUser;