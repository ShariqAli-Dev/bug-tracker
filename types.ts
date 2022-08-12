// Projects
export interface Personale {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ProjectTickets {
  id: number;
  title: string;
  submitter: string;
  developer: string;
  status: string;
  created: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  assignedPersonale: Personale[];
  tickets: ProjectTickets[];
  contributors: string[];
}

// Tickets
export interface Details {
  title: string;
  description: string;
  assignedDeveloper: number;
  submitted: string;
  project: string;
  priority: string;
  status: string;
  type: string;
  created: string;
  updated: string;
}

export interface Comment {
  commenter: string;
  message: string;
  created: string;
}

export interface History {
  property: string;
  oldValue: string;
  newValue: string;
  dateChanged: string;
}

export interface Attachment {
  file: string;
  uploader: string;
  notes: string;
  created: string;
}

export interface Ticket {
  id: number;
  details: Details;
  comments: Comment[];
  history: History[];
  attachments: Attachment[];
}

// User
export interface Notification {
  id: number;
  archived: boolean;
  message: string;
  date: string;
}

// Users
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  projectID: number;
}
