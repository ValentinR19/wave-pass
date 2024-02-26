import { AggregateRoot } from '../../../Shared/domain/AgregateRoot';
import { TicketCreatedDomainEvent } from './TicketCreatedDomainEvent';
import { TicketId } from './TicketId';
import { TicketName } from './TicketName';

export class Ticket extends AggregateRoot {
  id: TicketId;
  name: TicketName;

  constructor(id: TicketId, name: TicketName) {
    super();
    this.id = id;
    this.name = name;
  }

  static create(id: TicketId, name: TicketName): Ticket {
    const ticket = new Ticket(id, name);
    ticket.record(
      new TicketCreatedDomainEvent({
        aggregateId: ticket.id.value,
        name: ticket.name.value,
      }),
    );

    return ticket;
  }

  static fromPrimitives(plainData: { id: string; name: string }): Ticket {
    return new Ticket(new TicketId(plainData.id), new TicketName(plainData.name));
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
