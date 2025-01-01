export interface JobApplicationFormValues
  extends Record<string, string | undefined> {
  firstAndLastName: string;
  email: string;
  coverLetter?: string;
}
