export class HomeInfo {
    sports: string[] = [];
    partyTickets: number = 0;
}

export enum AlertType {
    Info, Warning, Error
}

export class Alert {
    type: AlertType = AlertType.Info;
    message: string = '';
}