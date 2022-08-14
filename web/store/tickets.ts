import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Ticket } from "../types";
import { initialTickets } from "../utils/dummyData";

interface TicketsState {
  tickets: Ticket[];
  getTickets: () => void;
}

const useTicketsStore = create<TicketsState>()(
  devtools(
    persist((set) => ({
      tickets: [],
      getTickets: () => set({ tickets: initialTickets }),
    }))
  )
);

export default useTicketsStore;
