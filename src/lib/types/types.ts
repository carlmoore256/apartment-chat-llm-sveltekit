export interface IPendingProcessedApartment {
    id: string;
    name: string;
    url: string;
}

export interface IApartment {
    id?: string;
    name: string; // Name of the apartment
    description: string;
    url: string;
    availabilityDate?: Date; // Date when the apartment becomes available
    // neighborhood?: Neighborhood;
    // size?: Size;
    // amenities?: Amenities;
    // budget?: Budget;
    notes?: string; // Optional notes about the apartment
}