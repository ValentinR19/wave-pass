import httpStatus from 'http-status';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { CreateUserCommand } from '../../../Contexts/UserManagment/Users/application/CreateUserCommand';
import { Controller } from './Controller';
import { Request, Response } from 'express';

type UserPutRequest = Request & {
  body: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
};
export class UserPutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: UserPutRequest, res: Response) {
    try {
      const { id, username, firstName, lastName } = req.body;
      const createCourseCommand = new CreateUserCommand({ id, username, firstName, lastName });
      await this.commandBus.dispatch(createCourseCommand);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      console.log('ERROR: ', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
