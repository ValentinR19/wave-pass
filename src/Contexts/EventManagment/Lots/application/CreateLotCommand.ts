import { Command } from '../../../Shared/domain/Command';

type Params = {
  id: string;
  name: string;
  totalTicket: number;
  price: number;
  idEvent: string;
};

export class CreateLotCommand extends Command {
  id: string;
  name: string;
  totalTicket: number;
  price: number;
  idEvent: string;

  constructor({ id, name, totalTicket, price, idEvent }: Params) {
    super();
    this.id = id;
    this.name = name;
    this.totalTicket = totalTicket;
    this.price = price;
    this.idEvent = idEvent;
  }
}
