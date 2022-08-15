import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Notification, User } from "../types";
import { initialNotifications } from "../utils/dummyData";

interface UserState {
  id: number | undefined;
  email: string;
  role: string;
  notifications: Notification[];
  login: (details: User & { token: string }) => void;
  getNotifications: (userID: number) => void;
  demoLogin: (role: string) => void;
  logout: () => void;
}

const initialState = {
  id: undefined,
  email: "",
  role: "",
  notifications: [],
};

const useUserStore = create<UserState>()(
  devtools(
    persist((set) => ({
      ...initialState,
      login: ({ id, email, role, token }) => {
        localStorage.setItem("token", token);
        set({ id, email, role });
      },
      getNotifications: (userID) =>
        set({ notifications: initialNotifications }),
      demoLogin: (role) => set({ id: 9999, email: "DEMO_USER", role }),
      logout: () => {
        localStorage.removeItem("token");
        set(initialState);
      },
    }))
  )
);

export default useUserStore;
