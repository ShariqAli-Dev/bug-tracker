import create from 'zustand/react';

interface UserState {
  id: number;
  username: string;
  email: string;
  role: string;
  projectID: number;
}

interface UsersState {
  users?: UserState[];
}

const useUsersState = create<UsersState>((set) => ({
  users: [],
  //   setUsers: () => set({users: })
}));
