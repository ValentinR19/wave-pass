import httpStatus from 'http-status';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { CreateEventCommand } from '../../../Contexts/EventManagment/Events/application/CreateEventCommand';
import { CreateLotCommand } from '../../../Contexts/EventManagment/Lots/application/CreateLotCommand';

type LotDTO = {
  id: string;
  name: string;
  totalTicket: number;
  price: number;
  idEvent: string;
};

type EventPutRequest = Request & {
  body: {
    id: string;
    title: string;
    eventDate: string;
    description: string;
    totalTickets: number;
    dateStartBuy: string;
    dateEndBuy: string;
    idUser: string;
    lots: LotDTO[];
  };
};
export class EventPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: EventPutRequest, res: Response) {
    try {
      const { id, title, eventDate, description, totalTickets, dateStartBuy, dateEndBuy, idLocation, idUser, lots } = req.body;
      const createEventCommand = new CreateEventCommand({ id, title, eventDate, description, totalTickets, dateStartBuy, dateEndBuy, idLocation, idUser });
      await this.commandBus.dispatch(createEventCommand);

      const createLotCommands: CreateLotCommand[] = lots.map(
        (lot: LotDTO) => new CreateLotCommand({ id: lot.id, idEvent: lot.idEvent, name: lot.name, price: lot.price, totalTicket: lot.totalTicket }),
      );
      await Promise.all(createLotCommands.map((lotCommand) => this.commandBus.dispatch(lotCommand)));
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      console.log('ERROR: ', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
