import { InputFieldProps } from "./InputFieldProps";
import { TextareaFieldProps } from "./TextareaFieldProps";

export interface FormProps<T extends Record<string, string>> {
  inputFields?: InputFieldProps[];
  textareaFields?: TextareaFieldProps[];
  handleSubmit: (values: T) => void;
  children?: React.ReactNode;
}
