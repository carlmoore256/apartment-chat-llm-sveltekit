export interface Apartment {
    id?: string;
    name: string; // Name of the apartment
    availabilityDate?: Date; // Date when the apartment becomes available
    neighborhood?: Neighborhood;
    size?: Size;
    amenities?: Amenities;
    budget?: Budget;
    links: string[]; // URLs for apartment listings
    notes?: string; // Optional notes about the apartment
}

export interface Neighborhood {
    name: string; // Name of the neighborhood
    northMax: string; // Maximum boundary on the north side
    southMax: string; // Maximum boundary on the south side
}

export interface Size {
    sqft: number; // Size in square feet
    rooms: number; // Number of rooms
}

export interface Amenities {
    groceryDistanceMins: number; // Walking distance to the nearest grocery store in minutes
    transportDistanceMins: number; // Walking distance to the nearest transport in minutes
    safety: string; // Safety rating or description, this could also be a number if you have a quantifiable metric
}

export interface Budget {
    maxAmount: number; // Maximum budget for the apartment
}

export interface Criteria {
}
