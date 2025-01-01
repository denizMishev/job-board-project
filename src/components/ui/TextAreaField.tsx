import React from "react";
import { TextareaFieldProps } from "../../types/TextareaFieldProps";

function TextareaField({
  name,
  label,
  value,
  onChange,
  errorMessage,
}: TextareaFieldProps) {
  return (
    <div className="form-input-container color-primary-switch-100-light">
      <label className="form-field-label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="job-form-input-field | job-apply-form-textarea | bg-neutral-100 color-primary-switch-100"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        cols={20}
        rows={5}
      ></textarea>
      <span className="user-form-error | color-red fs-100">{errorMessage}</span>
    </div>
  );
}

export default React.memo(TextareaField);
