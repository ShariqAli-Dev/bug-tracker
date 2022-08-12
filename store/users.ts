import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from '../types';
import { initialUsers } from '../utils/dummyData';

interface UsersState {
  users: User[];
  getUsers: () => void;
}

const useUsersStore = create<UsersState>()(
  devtools(
    persist((set) => ({
      users: [],
      getUsers: () => set({ users: initialUsers }),
    }))
  )
);

export default useUsersStore;
