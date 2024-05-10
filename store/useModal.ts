import { create } from 'zustand'

type TUseModal = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useModal = create<TUseModal>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export const useExitModal = create<TUseModal>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

export const usePracticeModal = create<TUseModal>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
