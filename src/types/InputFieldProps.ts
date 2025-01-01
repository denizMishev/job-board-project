export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errorMessage?: string;
  isFocused?: boolean;
  value?: string;
}
