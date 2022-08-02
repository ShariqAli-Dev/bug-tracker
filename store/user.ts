import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Notification } from '../types';
import { initialNotifications } from '../utils/dummyData';

interface UserState {
  id: number | undefined;
  username: string;
  role: string;
  notifications: Notification[];
  login: (username: string, password: string) => void;
  getNotifications: (userID: number) => void;
  demoLogin: (role: string) => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist((set) => ({
      id: undefined,
      username: '',
      role: '',
      notifications: [],
      login: (username, password) =>
        set({ id: 0, username: username, role: 'DEMO_ADMIN' }),
      demoLogin: (role) => set({ id: 9999, username: 'DEMO_USER', role }),
      getNotifications: (userID) =>
        set({ notifications: initialNotifications }),
    }))
  )
);

export default useUserStore;
