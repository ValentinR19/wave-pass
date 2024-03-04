import httpStatus from 'http-status';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import { CreateEventCommand } from '../../../Contexts/EventManagment/Events/application/CreateEventCommand';

type EventPutRequest = Request & {
  body: {
    id: string;
    title: string;
  };
};
export class EventPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: EventPutRequest, res: Response) {
    try {
      const { id, title } = req.body;
      const createEventCommand = new CreateEventCommand({ id, title });
      await this.commandBus.dispatch(createEventCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
