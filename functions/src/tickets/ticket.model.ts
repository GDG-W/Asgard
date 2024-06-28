import { Model } from "../internal/postgres";

/**
 * the user ID represents the ticket ID
 */
export interface Ticket extends Model {
  fullname?: string;
  email_address: string;
  role?: string;
  level_of_expertise: string;
  shirt_size: string;
  ticket_type: TicketType;
}

export const ticketTypes = <const>["day_one", "day_two", "both_days"];
export type TicketType = (typeof ticketTypes)[number];
