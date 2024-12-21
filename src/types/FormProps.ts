import { InputFieldProps } from "./InputFieldProps";
import { TextareaFieldProps } from "./TextareaFieldProps";

export interface FormProps {
  inputFields?: InputFieldProps[];
  textareaFields?: TextareaFieldProps[];
  handleSubmit: (
    values: Record<string, string | number | readonly string[]>
  ) => void;
  children?: React.ReactNode;
}
