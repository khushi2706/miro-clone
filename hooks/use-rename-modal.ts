import { create } from "zustand";
import { Id } from "@/convex/_generated/dataModel";

const defaultValues: { id: Id<"boards"> | ""; title: string } = {
  id: "",
  title: "",
};

type State = {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  open: (id: Id<"boards">, title: string) => void;
  close: () => void;
};

export const useRenameModal = create<State>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  open: (id, title) => set({ isOpen: true, initialValues: { id, title } }),
  close: () => set({ isOpen: false, initialValues: defaultValues }),
}));
