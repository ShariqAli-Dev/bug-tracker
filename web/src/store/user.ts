/* eslint-disable no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Notification, User } from "../types";
import { initialNotifications } from "../utils/dummyData";

interface UserState {
  id: number | undefined;
  email: string;
  role: string;
  notifications: Notification[];
  accessToken: string;
  login: (details: { accessToken: string }) => void;
  getNotifications: (userID: number) => void;
  demoLogin: (role: string) => void;
  logout: () => void;
}

const initialState = {
  id: undefined,
  email: "",
  role: "",
  notifications: [],
  accessToken: "",
};

const useUserStore = create<UserState>()(
  devtools(
    persist((set) => ({
      ...initialState,
      login: ({ accessToken }) => {
        set({ accessToken });
      },
      getNotifications: () => set({ notifications: initialNotifications }),
      demoLogin: (role) => set({ id: 9999, email: "demo@demo.com", role }),
      logout: () => {
        set(initialState);
      },
    }))
  )
);

export default useUserStore;
