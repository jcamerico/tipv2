export type RegistrationSummary = {
    id: number;
    status: RegistrationStatus;
    sportInfo: SportInfo;
    level: string;
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
    CANCELLED = 'CANCELLED',
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
