import React from "react";

function Input({
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
}) {
  return (
    <div className="form-input-container color-primary-switch-100-light">
      <label className="form-field-label" htmlFor={name}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className="job-form-input-field | job-apply-form-textarea | bg-neutral-100 color-primary-switch-100"
          name={name}
          cols="20"
          rows="5"
          pattern={pattern}
          value={value}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          className="user-form-input-field | bg-neutral-100 color-primary-switch-100"
          name={name}
          type={type}
          required={required}
          pattern={pattern}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          focused={isFocused.toString()}
        />
      )}
      <span className="user-form-error | color-red fs-100">{errorMessage}</span>
    </div>
  );
}

export default React.memo(Input);
