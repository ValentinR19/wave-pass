import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateTicketDomainEventAttributes = {
  readonly name: string;
};

export class TicketCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'ticket.created';

  readonly name: string;

  constructor({ aggregateId, name, eventId, occurredOn }: { aggregateId: string; eventId?: string; name: string; occurredOn?: Date }) {
    super({ eventName: TicketCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.name = name;
  }

  toPrimitives(): CreateTicketDomainEventAttributes {
    const { name } = this;
    return {
      name,
    };
  }

  static fromPrimitives(params: { aggregateId: string; attributes: CreateTicketDomainEventAttributes; eventId: string; occurredOn: Date }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new TicketCreatedDomainEvent({
      aggregateId,
      name: attributes.name,
      eventId,
      occurredOn,
    });
  }
}
