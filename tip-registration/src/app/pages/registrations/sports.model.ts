export type RegistrationSummary = {
    uid: string;
    status: RegistrationStatus;
    sportInfo: SportInfo;
    level: string;
    unregistration: boolean;
    teamInfo?: {
        complete: boolean;
        name: string | null;
        code: string | null;
        members: TeamMember[];
    } | undefined;
    events?: string[];

}

export enum RegistrationStatus {
    REGISTERED = 'REGISTERED',
    PENDING_APPROVAL = 'PENDING APPROVAL',
    AWAITING_PAYMENT = 'AWAITING PAYMENT',
    REFUSED = 'REFUSED',
    CANCELLED_BY_USER = 'CANCELLED BY USER',
    CANCELLED_WITH_REIMBURSEMENT = 'CANCELLED WITH REIMBURSEMENT'
}

export type SportInfo = {
    type: SportType;
    dates: CompetitionDay[];
    organizers: string[];
    contacts: string[];
}

export enum SportType {
    VOLLEY_243 = 'Volleyball 2.43m',
    BEACH_VOLLEY_243 = 'Beach Volleyball 2.43m',
    BASKETBALL = 'Basketball',
    BASEBALL = 'Baseball',
    ESPORTS = 'E-sports',
    BADMINTON = 'Badminton',
}

export type CompetitionDay = {
    startTime: Date;
    endTime: Date;
}

export type TeamMember = {
    firstName: string;
    lastName: string;
    teamCaptain: boolean;
}

export type SportReimbursementSummary = {
    uid: string,
    sportUid: string,
    sport: SportType;
    type: ReimbursementType;
    status: ReimbursementStatus;
    creationDate: Date;
    lastUpdateDate: Date;
    reason: string;
}

export enum ReimbursementStatus {
    OPEN = 'OPEN',
    APPROVED_BY_SPORT = 'APPROVED BY SPORT',
    AWAITING_REIMBURSEMENT = 'AWAITING REIMBURSEMENT',
    REIMBURSED = 'REIMBURSED',
    REFUSED = 'REFUSED'
}

export enum ReimbursementType {
    TOTAL, PARTIAL
}