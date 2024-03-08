import { Command } from '../../../Shared/domain/Command';
import { CreateLotCommand } from '../../Lots/application/CreateLotCommand';

type Params = {
  id: string;
  title: string;
  eventDate: string;
  description: string;
  totalTickets: number;
  dateStartBuy: string;
  dateEndBuy: string;
  idLocation: string;
  idUser: string;
  lots: CreateLotCommand[];
};

export class CreateEventCommand extends Command {
  id: string;
  title: string;
  eventDate: string;
  description: string;
  totalTickets: number;
  dateStartBuy: string;
  dateEndBuy: string;
  idLocation: string;
  idUser: string;
  lots: CreateLotCommand[];

  constructor({ id, title, eventDate, description, totalTickets, dateStartBuy, dateEndBuy, idLocation, idUser, lots }: Params) {
    super();
    this.id = id;
    this.title = title;
    this.eventDate = eventDate;
    this.description = description;
    this.totalTickets = totalTickets;
    this.dateStartBuy = dateStartBuy;
    this.dateEndBuy = dateEndBuy;
    this.idLocation = idLocation;
    this.idUser = idUser;
    this.lots = lots;
  }
}
