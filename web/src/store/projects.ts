import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Project } from "../types";
import { initialProjects } from "../utils/dummyData";

interface ProjectsState {
  projects: Project[];
  getProjects: () => void;
  reset: () => void;
}

const initialState = {
  projects: initialProjects,
};

const useProjectsStore = create<ProjectsState>()(
  devtools(
    persist((set) => ({
      ...initialState,
      getProjects: () => set({ projects: initialProjects }),
      reset: () => set(initialState),
    }))
  )
);

export default useProjectsStore;
