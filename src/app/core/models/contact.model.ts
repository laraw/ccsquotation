import { Child } from "./child.model";

export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    dob?: string;
    crn?: string;
    email: string;
    phone?: string;
    
    address?: string;
    relatedContactId?: number;
    children?: number[];
    addressLat?: number;
    addresssLng?: number;
}