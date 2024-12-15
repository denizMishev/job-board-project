import { useState, useCallback } from "react";
import { InputFieldProps } from "../types/InputFieldProps";
import { TextareaFieldProps } from "../types/TextareaFieldProps";

type FormFieldProps = InputFieldProps | TextareaFieldProps;

export function useForm(fields: FormFieldProps[]) {
  const initialFormValues = fields.reduce((acc, field) => {
    acc[field.name] = field.value || "";
    return acc;
  }, {} as Record<string, string | number | readonly string[]>);

  const initialFocusedFields = fields.reduce((acc, field) => {
    acc[`${field.name}Focus`] = false;
    return acc;
  }, {} as Record<string, boolean>);

  const [formValues, setFormValues] = useState(initialFormValues);
  const [focusedFields, setFocusedFields] = useState(initialFocusedFields);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormValues((state) => ({
        ...state,
        [name]: value,
      }));
    },
    []
  );

  const onBlurHandler = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = `${e.target.name}Focus`;
      setFocusedFields((state) => ({
        ...state,
        [name]: true,
      }));
    },
    []
  );

  return {
    formValues,
    setFormValues,
    focusedFields,
    setFocusedFields,
    onChangeHandler,
    onBlurHandler,
  };
}
