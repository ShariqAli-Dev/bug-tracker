import create from 'zustand';
import { Project } from '../types';
import { initialProjects } from '../utils/dummyData';

interface ProjectsState {
  projects: Project[];
}

export const useProjectsState = create<ProjectsState>((set) => ({
  projects: [],
  getProjects: () => set({ projects: initialProjects }),
}));
