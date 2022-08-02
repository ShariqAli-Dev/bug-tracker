import create from 'zustand';
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

export const useUserStore = create<UserState>((set) => ({
  id: undefined,
  username: '',
  role: '',
  notifications: [],
  login: (username, password) =>
    set({ id: 0, username: username, role: 'DEMO_ADMIN' }),
  demoLogin: (role) => set({ id: 9999, username: 'DEMO_USER', role }),
  getNotifications: (userID) => set({ notifications: initialNotifications }),
}));
