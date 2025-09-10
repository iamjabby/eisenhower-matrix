export type Quadrant = "Q1" | "Q2" | "Q3" | "Q4";

export interface Task {
  id: string;
  title: string;
  note?: string;
  due?: string; // ISO date
  quadrant: Quadrant;
  done: boolean;
  createdAt: number;
  completedAt?: number; 
}