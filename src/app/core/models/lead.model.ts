
export interface Lead {
    id: number,
    leadContactId: number,
    leadStage: string,
    leadComments: string,
    leadNotes: string[],
    leadEnquiryId?: null | number

}