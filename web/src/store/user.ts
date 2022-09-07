/* eslint-disable no-unused-vars */
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  id: number | undefined;
  email: string;
  role: string;
  login: (user: any) => void;
  demoLogin: (role: string) => void;
  reset: () => void;
}

const initialState = {
  id: undefined,
  email: "",
  role: "",
};

const useUserStore = create<UserState>()(
  devtools(
    persist((set) => ({
      ...initialState,
      login: async (user) => {
        set(user);
      },
      demoLogin: (role) => set({ id: 9999, email: "demo@demo.com", role }),
      reset: () => set(initialState),
    }))
  )
);

export default useUserStore;
