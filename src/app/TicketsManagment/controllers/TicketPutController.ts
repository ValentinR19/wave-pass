import httpStatus from 'http-status';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { CreateTicketCommand } from '../../../Contexts/TicketsManagment/Tickets/application/CreateTicketCommand';

type TicketPutRequest = Request & {
  body: {
    id: string;
    name: string;
  };
};
export class TicketPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: TicketPutRequest, res: Response) {
    try {
      const { id, name } = req.body;
      const createTicketCommand = new CreateTicketCommand({ id, name });
      await this.commandBus.dispatch(createTicketCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
