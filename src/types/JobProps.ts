export interface JobProps {
  jobId: string;
  company: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
  description: string;
  website: string;
  applicantEmails: string[];
  requirements: {
    content: string;
    items: string[];
  };
  role: {
    content: string;
    items: string[];
  };
}
