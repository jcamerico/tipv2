export class HomeInfo {
    sports: string[];
    partyTickets: number;

    constructor(sports: string[] = [], partyTickets: number = 0) {
        this.sports = sports;
        this.partyTickets = partyTickets;
    }
}

export enum AlertType {
    Info, Warning, Error
}

export class Alert {
    type: AlertType;
    message: string;

    constructor(type: AlertType = AlertType.Info, message: string = '') {
        this.type = type;
        this.message = message;
    }

}