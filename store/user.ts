import create from 'zustand/react';

interface NotificationState {}

interface UserState {
  id: number | undefined;
  username: string;
  role: string;
  login: (username: string, password: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  id: undefined,
  username: '',
  role: '',
  login: (username, password) =>
    set({ id: 0, username: username, role: 'DEMO_ADMIN' }),
}));
