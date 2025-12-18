"use client";

import { createContext, useContext } from "react";
import type { ResumeLayoutEngine } from "resume-layout-engine";

interface EngineContextValue {
  engine: ResumeLayoutEngine | null;
  updateStats: () => void;
}

const EngineContext = createContext<EngineContextValue | undefined>(undefined);

export const useEngine = () => {
  const context = useContext(EngineContext);
  if (!context) {
    // Return a safe default when used outside provider
    return { engine: null, updateStats: () => {} };
  }
  return context;
};

export const EngineProvider = EngineContext.Provider;

