import create from 'zustand';
import { Ticket } from '../types';
import { initialTickets } from '../utils/dummyData';

interface TicketsState {
  tickets: Ticket[];
  getTickets: () => void;
}

export const useProjectsState = create<TicketsState>((set) => ({
  tickets: [],
  getTickets: () => set({ tickets: initialTickets }),
}));
