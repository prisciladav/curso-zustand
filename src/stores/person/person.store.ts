import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/session.storage";
// import { firebaseStorage } from "../storages/firebase.storage";
// import { logger } from "../middlewares/logger.middlewares";


interface PersonState {
    firstName: string;
    lastName: string;
}

interface Actions {
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

// dividir en dos interfaces es lo mismo que hacer una sola como en Beaars

const storeApi: StateCreator<PersonState & Actions, [["zustand/devtools", never], ["zustand/persist", unknown]]> = (set) => ({

    firstName: 'Fernando',
    lastName: 'Herrera',

    setFirstName: (value: string) => set( ({ firstName: value}), false, 'setFirstName' ),
    setLastName: (value: string) => set( ({ lastName: value}), false, 'setLastName' ),
})

export const usePersonStore = create<PersonState & Actions>() (
    devtools(
        persist(
            storeApi
        , {
            name: 'person-storage',
            //storage: firebaseStorage // si no pongo nada => guarda en el localStorage
                                    // firebaseStorage => en este caso se maneja el storage en firebase
            // storage: customSessionStorage // => es un  custom storage que guarda en sesson storage

        })
    )
)