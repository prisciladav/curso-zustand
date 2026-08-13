import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = 'https://curso-zustand-ef611-default-rtdb.firebaseio.com/zustand'

// store que escribe en firebase https://console.firebase.google.com/project/curso-zustand-ef611/database/curso-zustand-ef611-default-rtdb/data?hl=es-419 (prisciladavina29@gmail.com)
const storageApi: StateStorage = {
    getItem: async function (name: string): Promise<string | null> {
        // eslint-disable-next-line no-useless-catch
        try {
            const data = await fetch(`${ firebaseUrl }/${ name }.json`).then( res => res.json());
            console.log(data);
            return JSON.stringify( data );

        } catch (error) {
            throw error;
        }
    },

    setItem: async function (name: string, value: string): Promise<void> {
        await fetch(`${ firebaseUrl }/${ name }.json`, {
            method: 'PUT',
            body: value
        }).then( res => res.json());
        return;
    },

    removeItem: function (name: string): void | Promise<void> {
        console.log('removeItem', name);
    }
}

export const firebaseStorage = createJSONStorage( () => storageApi )