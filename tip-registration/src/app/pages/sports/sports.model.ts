export type SportSummary = {
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
