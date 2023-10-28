import { writable } from "svelte/store";
import type { IPendingProcessedApartment } from "$lib/types/types";

export const pendingApartentStore = writable<IPendingProcessedApartment[]>([]);