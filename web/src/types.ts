export interface User {
  email: string;
  id: number;
  name: string;
  role: string;
}

export interface AssignedPersonnel {
  user: User;
}
