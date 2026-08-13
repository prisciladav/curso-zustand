import { StateCreator } from "zustand";

export interface DateSlice {
    eventDate: Date;

    eventYYYYMMDD: () => string;
    eventHHMM: () => string;

    setEventDate: (parcialDate: string) => void;
    setEventTime: (eventTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice, [["zustand/devtools", never]]> = (set, get) => ({
    eventDate: new Date(),

    eventYYYYMMDD: () => {
        return get().eventDate.toISOString().split('T')[0];
    },
    eventHHMM: () => {
        const hours = get().eventDate.getHours().toString().padStart(2, '0');
        const minutes = get().eventDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    },

    setEventDate: (parcialDate: string) => {
        const currentDate = get().eventDate;
        const [year, month, day] = parcialDate.split('-').map(Number);
        const newDate = new Date(currentDate);
        newDate.setFullYear(year, month - 1, day);
        set({ eventDate: newDate });
    },

    setEventTime: (eventTime: string) => {
        const currentDate = get().eventDate;
        const [hours, minutes] = eventTime.split(':').map(Number);
        const newDate = new Date(currentDate);
        newDate.setHours(hours, minutes);
        set({ eventDate: newDate });
    }
});