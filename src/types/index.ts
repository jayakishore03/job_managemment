export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  experience: string;
  location: string;
  salary: string;
  postedTime: string;
  description: string;
  postedBy: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}