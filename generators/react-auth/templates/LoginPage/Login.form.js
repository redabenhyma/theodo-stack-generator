// @flow
import React from "react";
import { Form, Field } from "formik";

declare type FormValues = {
  email: string,
  password: string
};

type Props = {
  errors: FormValues,
  touched: FormValues,
  isSubmitting: boolean
};

const InnerLoginForm = (props: Props) => {
  const { errors, touched, isSubmitting } = props;

  return (
    <Form>
      <div>
        <Field type="email" name="email" />
        {touched.email && errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <Field type="password" name="password" />
        {touched.password && errors.password && <div>{errors.password}</div>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Connect
      </button>
    </Form>
  );
};

export default InnerLoginForm;
