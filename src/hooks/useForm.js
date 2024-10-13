import { useState } from "react";

export function useForm(fields) {
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

  return {
    formValues,
    setFormValues,
    focusedFields,
    setFocusedFields,
    onChangeHandler,
    onBlurHandler,
  };
}
