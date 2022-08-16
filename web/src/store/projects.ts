/* eslint-disable no-unused-vars */

import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Project } from "../types";
import { initialProjects } from "../utils/dummyData";

interface ProjectsState {
  projects: Project[];
  getProjects: () => void;
}

const useProjectsStore = create<ProjectsState>()(
  devtools(
    persist((set) => ({
      projects: [],
      getProjects: () => set({ projects: initialProjects }),
    }))
  )
);

export default useProjectsStore;
