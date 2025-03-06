export class TicketCode {
    uid: string;
    party: boolean;
    owner?: string;
    drinks: number;
    scanned: boolean;

    constructor(drinks: number, uid: string = '', scanned: boolean = false, owner?: string) {
        this.uid = uid;
        this.drinks = drinks;
        this.scanned = scanned;
        if (owner) {
            this.owner = owner;
            this.party = true;
        } else {
            this.party = false;
        }
    }

    computePrice(partyTicketPrice: number, drinkTicketPrice: number): number {
        if (this.party) {
            if (this.drinks > 0) {
                return partyTicketPrice + drinkTicketPrice;
            } else {
                return partyTicketPrice;
            }
        } else {
            return drinkTicketPrice;
        }
    }
}

export class BasketTicket {

    ticket: TicketCode;
    price: number;

    constructor(ticket: TicketCode, partyTicketPrice: number, drinkTicketPrice: number) {
        this.ticket = ticket;
        this.price = this.computePrice(partyTicketPrice, drinkTicketPrice);
    }

    private computePrice(partyTicketPrice: number, drinkTicketPrice: number): number {
        if (this.ticket.party) {
            if (this.ticket.drinks > 0) {
                return partyTicketPrice + drinkTicketPrice;
            } else {
                return partyTicketPrice;
            }
        } else {
            return drinkTicketPrice;
        }
    }
}

export type CouponReduction = {
    couponCode: string;
    description: string;
    reduction: number;
}