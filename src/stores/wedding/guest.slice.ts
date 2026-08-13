import { StateCreator } from "zustand";


export interface GuestSlice {
    guests: number;
    setGuests: (guests: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice, [["zustand/devtools", never]]> = (set) => ({
    guests: 0,
    setGuests: (guests: number) => set({ guests }),
})

