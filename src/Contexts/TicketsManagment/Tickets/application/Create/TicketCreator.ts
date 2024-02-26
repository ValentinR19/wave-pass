import { EventBus } from '../../../../Shared/domain/EventBus';
import { Ticket } from '../../domain/Ticket';
import { TicketId } from '../../domain/TicketId';
import { TicketName } from '../../domain/TicketName';
import { TicketRepository } from '../../domain/TicketRepository';

export class TicketCreator {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(params: { id: TicketId; name: TicketName }): Promise<void> {
    const ticket = Ticket.create(params.id, params.name);

    await this.ticketRepository.save(ticket);

    await this.eventBus.publish(ticket.pullDomainEvents());
  }
}
