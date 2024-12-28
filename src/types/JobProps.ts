export interface JobProps {
  id: string;
  company: string;
  contract: string;
  description: string;
  location: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  requirements: {
    content: string;
    items: string[];
  };
  role: {
    content: string;
    items: string[];
  };
  website: string;
  applicantEmails: string[];
}
