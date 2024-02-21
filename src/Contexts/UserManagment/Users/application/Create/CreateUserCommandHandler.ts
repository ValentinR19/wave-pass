import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserFirstName } from '../../domain/UserFirstName';
import { UserId } from '../../domain/UserId';
import { UserLastName } from '../../domain/UserLastName';
import { UserUsername } from '../../domain/UserUsername';
import { CreateUserCommand } from '../CreateUserCommand';
import { UserCreator } from './UserCreator';

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(private userCreator: UserCreator) {}

  subscribedTo(): Command {
    console.log('Entra aca')
    return CreateUserCommand;
  }

  async handle(command: CreateUserCommand): Promise<void> {
    console.log('Command', command)
    const id = new UserId(command.id);
    const username = new UserUsername(command.username);
    const firstName = new UserFirstName(command.firstName);
    const lastName = new UserLastName(command.lastName);
    await this.userCreator.run({ id, username, firstName, lastName });
  }
}
