import { Ticket } from "./ticket.model";
import knex from "../config/postgres";

export class TicketRepo {
  private db = () => knex<Ticket>("tickets");

  async findByEmails(db = this.db, emails: string[]): Promise<Ticket[]> {
    return db().whereIn("email_address", emails).select("*");
  }
}

export const ticketRepo = new TicketRepo();
