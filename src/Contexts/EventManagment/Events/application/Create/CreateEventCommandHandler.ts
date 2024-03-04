import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { EventId } from '../../domain/EventId';
import { EventTitle } from '../../domain/EventTitle';
import { CreateEventCommand } from '../CreateEventCommand';
import { EventCreator } from './EventCreator';

export class CreateEventCommandHandler implements CommandHandler<CreateEventCommand> {
  constructor(private eventCreator: EventCreator) {}

  subscribedTo(): Command {
    return CreateEventCommand;
  }

  async handle(command: CreateEventCommand): Promise<void> {
    const id = new EventId(command.id);
    const title = new EventTitle(command.title);
    await this.eventCreator.run({ id, title });
  }
}
