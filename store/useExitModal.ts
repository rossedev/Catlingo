import { create } from 'zustand'

type TUseExistModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useExitModal = create<TUseExistModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
