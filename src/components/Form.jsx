import { useForm } from "../hooks/useForm";
import InputField from "../components/ui/InputField";

function Form({ fields, handleSubmit, children }) {
  const { formValues, onChangeHandler, onBlurHandler, focusedFields } =
    useForm(fields);

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
      {children}
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
