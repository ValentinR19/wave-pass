import httpStatus from 'http-status';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { CreateEventCommand } from '../../../Contexts/EventManagment/Events/application/CreateEventCommand';

type LotDTO = {
  id: string;
  name: string;
  totalTicket: string;
  prive: string;
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
    idLocation: string;
    idUser: string;
    lots: LotDTO[];
  };
};
export class EventPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: EventPutRequest, res: Response) {
    try {
      const { id, title, eventDate, description, totalTickets, dateStartBuy, dateEndBuy, idLocation, idUser, lots } = req.body;
      const createEventCommand = new CreateEventCommand({ id, title, eventDate, description, totalTickets, dateStartBuy, dateEndBuy, idLocation, idUser, lots });
      await this.commandBus.dispatch(createEventCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
