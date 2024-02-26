import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { TicketId } from '../../domain/TicketId';
import { TicketName } from '../../domain/TicketName';
import { CreateTicketCommand } from '../CreateTicketCommand';
import { TicketCreator } from './TicketCreator';

export class CreateTicketCommandHandler implements CommandHandler<CreateTicketCommand> {
  constructor(private ticketCreator: TicketCreator) {}

  subscribedTo(): Command {
    return CreateTicketCommand;
  }

  async handle(command: CreateTicketCommand): Promise<void> {
    const id = new TicketId(command.id);
    const name = new TicketName(command.name);
    await this.ticketCreator.run({ id, name });
  }
}
