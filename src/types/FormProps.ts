import { InputFieldProps } from "./InputFieldProps";
import { TextareaFieldProps } from "./TextareaFieldProps";

export interface FormProps {
  inputFields?: InputFieldProps[];
  textareaFields?: TextareaFieldProps[];
  handleSubmit: (values: Record<string, string>) => void;
  children?: React.ReactNode;
}
