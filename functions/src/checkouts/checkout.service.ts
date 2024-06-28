import knex from "../config/postgres";
import { ticketRepo } from "../tickets";

export class CheckoutService {
  public ticketRepo = ticketRepo;

  async initiate() {
    const trx = await knex.transaction();
    try {
      // check if emails already have a ticket
      // check if emails already exists in the payments
      // if none, lock email
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
}

export default new CheckoutService();
