import create from 'zustand';
import { User } from '../types';
import { initialUsers } from '../utils/dummyData';

interface UsersState {
  users: User[];
  getUsers: () => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  getUsers: () => set({ users: initialUsers }),
}));
