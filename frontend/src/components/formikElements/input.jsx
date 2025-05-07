import { ErrorMessage, FastField } from "formik";
import React from "react";
import ErrorPersonal from "./errorPersonal";

export default function Input(props) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>

      <FastField
        type={props.type}
        name={props.name}
        className={props.className}
        id={props.name}
        placeholder={props.placeholder}
      />
      <ErrorMessage name={props.name} component={ErrorPersonal}/>
    </>
  );
}
