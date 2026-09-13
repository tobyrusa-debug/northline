import { create } from "zustand";
import { persist } from "zustand/middleware";
import { uid } from "@/lib/utils";

export type Booking = {
  id: string;
  sessionType: string;
  coachId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  notes: string;
  createdAt: string;
};

export type WorkoutLog = {
  id: string;
  workoutId: string;
  title: string;
  completedAt: string;
  durationMin: number;
};

export type CalculatorResult = {
  tdee: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  goal: "lose" | "maintain" | "gain";
  savedAt: string;
};

type JournalState = {
  bookings: Booking[];
  logs: WorkoutLog[];
  calculator: CalculatorResult | null;
  addBooking: (input: Omit<Booking, "id" | "createdAt">) => Booking;
  cancelBooking: (id: string) => void;
  addLog: (input: Omit<WorkoutLog, "id">) => void;
  saveCalculator: (input: Omit<CalculatorResult, "savedAt">) => void;
};

export const useJournal = create<JournalState>()(
  persist(
    (set) => ({
      bookings: [],
      logs: [],
      calculator: null,
      addBooking: (input) => {
        const booking: Booking = {
          ...input,
          id: uid(),
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ bookings: [booking, ...s.bookings] }));
        return booking;
      },
      cancelBooking: (id) =>
        set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) })),
      addLog: (input) =>
        set((s) => ({
          logs: [{ ...input, id: uid() }, ...s.logs].slice(0, 40),
        })),
      saveCalculator: (input) =>
        set({ calculator: { ...input, savedAt: new Date().toISOString() } }),
    }),
    { name: "northline-journal" },
  ),
);
