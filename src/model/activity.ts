
export interface User {
  id: number;
  name: string;
}

export interface Activity {
  id: number;
  workspaceId: number;
  priority: Priority;
  assignedTo: User;
  title: string;
  description: string;
  status: Status;
  startDate: number;
  endDate: number;
  duration?: any;
}

export type Status = 'running' | 'completed' | 'paused' | null;
export type Priority = 'high' | 'middle' | 'low';

export const priorityColors = {
  high: 'red',
  middle: 'orange',
  low: 'lightgreen'
}

export const STATUS_MODE = {
  RUNNING: 'running',
  COMPLETED: 'completed',
  PAUSED: 'paused',
} as const;
