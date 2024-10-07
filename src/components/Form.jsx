import React, { useState } from "react";
import InputField from "../components/ui/InputField";

function Form({ fields, handleSubmit }) {
  const initialFormValues = fields.reduce((acc, field) => {
    acc[field.name] = field.value || "";
    return acc;
  }, {});

  const initialFocusedFields = fields.reduce((acc, field) => {
    acc[`${field.name}Focus`] = false;
    return acc;
  }, {});

  const [formValues, setFormValues] = useState(initialFormValues);
  const [focusedFields, setFocusedFields] = useState(initialFocusedFields);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const onBlurHandler = (e) => {
    const name = `${e.target.name}Focus`;
    setFocusedFields((state) => ({
      ...state,
      [name]: true,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    handleSubmit(e, formValues);
  };

  return (
    <form className="form" onSubmit={onSubmitHandler} noValidate>
      {fields.map((field) => (
        <InputField
          key={field.name}
          {...field}
          value={formValues[field.name]}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          isFocused={focusedFields[`${field.name}Focus`]}
        />
      ))}
      <button className="form-submit-button | button" type="submit">
        Submit
      </button>
      {/* <span className="required-fields | fs-100 color-neutral-500">
        *All fields required
      </span> */}
    </form>
  );
}

export default Form;
