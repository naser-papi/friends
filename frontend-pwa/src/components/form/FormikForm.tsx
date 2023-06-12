import React from "react";
import { Formik } from "formik";
import { Box } from "@mui/material";
import { IFormikForm } from "../../models/FormTypes";

const FormikForm: React.FC<IFormikForm<any>> = (props) => {
  return (
    <Formik
      validationSchema={props.schema}
      initialValues={props.initialValues}
      onSubmit={props.doSubmit}
    >
      {({ handleSubmit }) => (
        <Box component="form" onSubmit={handleSubmit} sx={props.sx as any}>
          {props.children}
        </Box>
      )}
    </Formik>
  );
};

export default FormikForm;
