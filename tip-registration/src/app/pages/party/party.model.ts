export type TicketCode = {
    // Should I just use UUID instead of UID + Code?
    uid: string;
    code: string;
    party?: {
        owner: string;
    }
    drinks: number;
}