import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  title: string;
  eventDate: string;
  description: string;
  totalTickets: number;
  dateStartBuy: string;
  dateEndBuy: string;
  idUser: string;
};

export class CreateEventCommand extends Command {
  id: string;
  title: string;
  eventDate: string;
  description: string;
  totalTickets: number;
  dateStartBuy: string;
  dateEndBuy: string;
  idUser: string;

  constructor({ id, title, eventDate, description, totalTickets, dateStartBuy, dateEndBuy, idUser }: Params) {
    super();
    this.id = id;
    this.title = title;
    this.eventDate = eventDate;
    this.description = description;
    this.totalTickets = totalTickets;
    this.dateStartBuy = dateStartBuy;
    this.dateEndBuy = dateEndBuy;
    this.idUser = idUser;
  }
}
