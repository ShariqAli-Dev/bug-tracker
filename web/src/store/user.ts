/* eslint-disable no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Notification, User } from "../types";
import { initialNotifications } from "../utils/dummyData";
import jwt from "jsonwebtoken";

interface UserState {
  id: number | undefined;
  email: string;
  role: string;
  notifications: Notification[];
  accessToken: string;
  login: (accessToken: string) => void;
  getNotifications: (userId: number) => void;
  demoLogin: (role: string) => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
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
      login: async (accessToken) => {
        const decoded = jwt.verify(
          accessToken,
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string
        ) as User;

        set({
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          accessToken,
        });
      },
      getNotifications: () => set({ notifications: initialNotifications }),
      demoLogin: (role) => set({ id: 9999, email: "demo@demo.com", role }),
      logout: () => set(initialState),
      setAccessToken: (accessToken) => set({ accessToken }),
    }))
  )
);

export default useUserStore;
