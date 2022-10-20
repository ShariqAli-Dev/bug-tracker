export interface User {
  email: string;
  id: number;
  name: string;
  role: string;
}

export interface AssignedPersonnel {
  user: User;
}

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  finalRef: any;
  initialRef: any;
  assignedPersonnel?: AssignedPersonnel[];
}
