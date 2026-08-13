import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { ConfirmSlice, createConfirmSlice } from "./confirm.slice";

// creo un tipo para que no quede tan grande en el create
type ShareState = PersonSlice & GuestSlice & DateSlice & ConfirmSlice;

export const useWeddingBoundStore = create<ShareState>()(
    devtools(
        (...a) => ({
            ...createPersonSlice(...a),
            ...createGuestSlice(...a),
            ...createDateSlice(...a),
            ...createConfirmSlice(...a),
        })
    )
)