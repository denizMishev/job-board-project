import { useState } from "react";

export function useForm(fields) {
  // Initialize form values based on the fields provided
  const initialFormValues = fields.reduce((acc, field) => {
    acc[field.name] = field.value || "";
    return acc;
  }, {});

  // Initialize focused fields for validation styling
  const initialFocusedFields = fields.reduce((acc, field) => {
    acc[`${field.name}Focus`] = false;
    return acc;
  }, {});

  // State hooks for form values and focused fields
  const [formValues, setFormValues] = useState(initialFormValues);
  const [focusedFields, setFocusedFields] = useState(initialFocusedFields);

  // Handler for input value changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((state) => ({
      ...state,
      [name]: value,
    }));
  };

  // Handler for input blur events
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
