# Asgard

backend application for DevFest Lagos's ticketing platform

## TLDR;

As of this writing, the application is built to be run as a Typescript based [firebase function](https://firebase.google.com/docs/functions) by exposing it's [express](https://expressjs.com/) app instance to firebase's http request handler. For persistence, we use [PostgreSQL](https://www.postgresql.org/) while leveraging [Knex.js](https://knexjs.org) for db comms, this way, we minimise dependencies which ultimately improves server startup time and everything in between.

## Business Constraints / Roadmap

[] Self Purchase
[] Third Party purchases
[] Ticket updates / upgrades
