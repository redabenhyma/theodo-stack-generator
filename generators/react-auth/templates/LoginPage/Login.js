// @flow
import { withFormik } from "formik";
import InnerLoginForm from "./Login.form";

const LoginFormContainer = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  validate: values => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email";
    }
    return errors;
  },
  handleSubmit: (values, { props }) => {
    props.login(values);
  }
})(InnerLoginForm);

export default LoginFormContainer;
