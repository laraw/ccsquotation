import { Child } from "./child.model";

export interface Enquiry {
    id: number;
    contactId: number;
    centreId: number;
    children: number[];
    enquiryDate: string;
    preferredStartDate: string;


}