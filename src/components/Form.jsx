import { useForm } from "../hooks/useForm.ts";

import InputField from "./ui/InputField.tsx";
import TextAreaField from "./ui/TextareaField";

function Form({ fields, handleSubmit, children }) {
  const { formValues, onChangeHandler, onBlurHandler, focusedFields } =
    useForm(fields);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    handleSubmit(formValues);
  };

  return (
    <form className="form" onSubmit={onSubmitHandler} noValidate>
      {fields.map(({ name, label, ...fieldProps }) =>
        fieldProps.type === "textarea" ? (
          <TextAreaField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
            value={formValues[name]}
            onChange={onChangeHandler}
          />
        ) : (
          <InputField
            key={name}
            name={name}
            label={label}
            {...fieldProps}
            value={formValues[name]}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            isFocused={focusedFields[`${name}Focus`]}
          />
        )
      )}
      {children}
      <button className="form-submit-button | button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
