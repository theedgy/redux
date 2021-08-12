import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";

import { POST_FORM_REQUESTED } from "../../store/form/actions";
import { Loading } from "../Loading";

import "./index.scss";

const formikConfig = {
  initialValues: { name: "jimmy" },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .test(
        "is-jimmy",
        "${name} is not Jimmy", // eslint-disable-line no-template-curly-in-string
        (value, context) => value === "jimmy"
      )
      .required("Required field")
  })
};

const LoadingHandler = () => {
  const { setSubmitting } = useFormikContext();

  // resets the form state on unmount
  useEffect(() => () => {
    setSubmitting(false);
  });
  return <Loading message="Hold your pants..." />;
};

const Teams = ({ dispatch, loading }) => {
  return (
    <Formik
      {...formikConfig}
      onSubmit={(values, actions) => {
        dispatch({ type: POST_FORM_REQUESTED, data: values });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2>Form</h2>
          <Field name="name" type="text">
            {({ field, meta }) => (
              <div>
                <input type="text" placeholder="Name" {...field} />
                {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <button type="submit" disabled={isSubmitting}>
            {/* conditionally rendering the component which will update the forms' state */}
            {loading ? <LoadingHandler /> : "Save it!"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

// have to connect to right sub-store
export default connect((state) => state.forms)(Teams);
