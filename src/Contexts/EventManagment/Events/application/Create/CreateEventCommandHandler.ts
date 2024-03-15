import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { UserId } from '../../../Shared/domain/UserId';
import { EventDate } from '../../domain/EventDate';
import { EventDescription } from '../../domain/EventDescription';
import { EventId } from '../../domain/EventId';
import { EventTitle } from '../../domain/EventTitle';
import { EventTotalTicket } from '../../domain/EventTotalTicket';
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
    const eventDate = new EventDate(command.eventDate);
    const description = new EventDescription(command.description);
    const totalTickets = new EventTotalTicket(command.totalTickets);
    const dateStartBuy = new EventDate(command.eventDate);
    const dateEndBuy = new EventDate(command.dateEndBuy);
    const idUser = new UserId(command.idUser);
    await this.eventCreator.run({ id, title, eventDate, description, totalTickets, idUser, dateStartBuy, dateEndBuy });
  }
}
