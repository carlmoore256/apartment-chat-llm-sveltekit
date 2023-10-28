import { writable } from "svelte/store";
import type { IApartment } from "$lib/types/types";

export const apartmentStore = writable<IApartment[]>([
    {
        id: "1",
        name: "Apartment 1",
        description: "This is a description",
        url: "https://www.google.com",
    },
    {
        id: "2",
        name: "Apartment 2",
        description: "This is a description",
        url: "https://www.google.com",
    }

]);
