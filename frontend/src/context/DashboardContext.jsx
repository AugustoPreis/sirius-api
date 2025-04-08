import { createContext, useContext } from 'react';

export const DashboardContext = createContext();

export function useDashboardContext() {
  return useContext(DashboardContext);
}