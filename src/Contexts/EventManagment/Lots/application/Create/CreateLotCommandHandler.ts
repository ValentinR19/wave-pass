import { Command } from '../../../../Shared/domain/Command';
import { CommandHandler } from '../../../../Shared/domain/CommandHandler';
import { EventId } from '../../../Events/domain/EventId';
import { LotId } from '../../domain/LotId';
import { LotName } from '../../domain/LotName';
import { LotPrice } from '../../domain/LotPrice';
import { LotTotalTicket } from '../../domain/LotTotalTicket';
import { CreateLotCommand } from '../CreateLotCommand';
import { LotCreator } from './LotCreator';

export class CreateLotCommandHandler implements CommandHandler<CreateLotCommand> {
  constructor(private eventCreator: LotCreator) {}

  subscribedTo(): Command {
    return CreateLotCommand;
  }

  async handle(command: CreateLotCommand): Promise<void> {
    const id = new LotId(command.id);
    const name = new LotName(command.name);
    const totalTicket = new LotTotalTicket(command.totalTicket);
    const price = new LotPrice(command.price);
    const idEvent = new EventId(command.idEvent);

    await this.eventCreator.run({ id, name, totalTicket, price, idEvent });
  }
}
