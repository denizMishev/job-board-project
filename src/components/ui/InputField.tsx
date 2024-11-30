import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errorMessage?: string;
  isFocused?: boolean;
}

function InputField({
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  required,
  pattern,
  errorMessage,
  isFocused,
}: InputFieldProps) {
  return (
    <div className="form-input-container color-primary-switch-100-light">
      <label className="form-field-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="user-form-input-field | bg-neutral-100 color-primary-switch-100"
        name={name}
        id={name}
        type={type}
        required={required}
        pattern={pattern}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        data-focused={isFocused?.toString()}
      />
      <span className="user-form-error | color-red fs-100">{errorMessage}</span>
    </div>
  );
}

export default React.memo(InputField);
