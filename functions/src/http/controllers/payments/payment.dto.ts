import { TicketType, ticketTypes } from "../../../tickets";

import joi from "joi";

const isRequiredString = () => joi.string().required();
const isEmail = () => isRequiredString().email().lowercase();

export interface PaymentRequestDto {
  payer: {
    fullname: string;
    email_address: string;
  };
  attendees:
    | { email_address: string; ticket_type: TicketType }[]
    | [
        {
          fullname: string;
          email_address: string;
          role: string;
          level_of_expertise: string;
          shirt_size: string;
          ticket_type: TicketType;
        }
      ];
}

const payerAttendee = joi
  .array()
  .length(1)
  .items(
    joi.object().keys({
      fullname: isRequiredString(),
      email_address: isEmail(),
      role: isRequiredString(),
      level_of_expertise: isRequiredString(),
      shirt_size: isRequiredString(),
      ticket_type: isRequiredString().valid(...ticketTypes),
    })
  )
  .unique("email_address");

const nonPayerAttendees = joi
  .array()
  .min(1)
  .items(
    joi.object().keys({
      email_address: isEmail(),
      ticket_type: isRequiredString().valid(...ticketTypes),
    })
  )
  .unique("email_address");

export const paymentRequestDto = joi.object().keys({
  payer: joi
    .object()
    .keys({
      fullname: isRequiredString(),
      email_address: isEmail(),
    })
    .required(),
  payer_is_attendee: joi.bool().required(),
  attendees: joi
    .when("payer_is_attendee", {
      is: joi.valid(true),
      then: payerAttendee,
      otherwise: nonPayerAttendees,
    })
    .required()
    .messages({
      "array.unique": "The attendees list contains duplicate emails.",
    }),
});
