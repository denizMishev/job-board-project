import { useForm } from "../hooks/useForm.js";

import InputField from "./ui/InputField";
import TextareaField from "./ui/TextareaField";

import { FormProps } from "../types/FormProps";

function Form({
  inputFields = [],
  textareaFields = [],
  handleSubmit,
  children,
}: FormProps) {
  const allFields = [...inputFields, ...textareaFields];
  const { formValues, onChangeHandler, onBlurHandler, focusedFields } =
    useForm(allFields);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formValues);
      }}
      noValidate
    >
      {inputFields.map((field) => (
        <InputField
          key={field.name}
          {...field}
          value={formValues[field.name]}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          isFocused={focusedFields[`${field.name}Focus`]}
        />
      ))}

      {textareaFields.map((field) => (
        <TextareaField
          key={field.name}
          {...field}
          value={formValues[field.name]}
          onChange={onChangeHandler}
        />
      ))}

      {children}
      <button className="form-submit-button | button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
