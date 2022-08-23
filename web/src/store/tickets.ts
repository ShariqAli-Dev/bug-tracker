import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Ticket } from "../types";
import { initialTickets } from "../utils/dummyData";

interface TicketsState {
  tickets: Ticket[];
  getTickets: () => void;
  reset: () => void;
}

const initialState = {
  tickets: [],
};

const useTicketsStore = create<TicketsState>()(
  devtools(
    persist((set) => ({
      ...initialState,
      getTickets: () => set({ tickets: initialTickets }),
      reset: () => set(initialState),
    }))
  )
);

export default useTicketsStore;
