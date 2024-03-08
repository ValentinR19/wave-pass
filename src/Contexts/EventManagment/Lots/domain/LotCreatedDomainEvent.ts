import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateLotDomainEventAttributes = {
  readonly name: string;
  readonly totalTicket: number;
  readonly price: number;
  readonly idEvent: string;
};

export class LotCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'lot.created';

  readonly name: string;
  readonly totalTicket: number;
  readonly price: number;
  readonly idEvent: string;

  constructor({
    aggregateId,
    name,
    totalTicket,
    price,
    idEvent,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    name: string;
    totalTicket: number;
    price: number;
    idEvent: string;
    occurredOn?: Date;
  }) {
    super({ eventName: LotCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.name = name;
    this.totalTicket = totalTicket;
    this.price = price;
    this.idEvent = idEvent;
  }

  toPrimitives(): CreateLotDomainEventAttributes {
    const { name, totalTicket, price, idEvent } = this;
    return {
      name,
      totalTicket,
      price,
      idEvent,
    };
  }

  static fromPrimitives(params: { aggregateId: string; attributes: CreateLotDomainEventAttributes; eventId: string; occurredOn: Date }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new LotCreatedDomainEvent({
      aggregateId,
      name: attributes.name,
      totalTicket: attributes.totalTicket,
      price: attributes.price,
      idEvent: attributes.idEvent,
      eventId,
      occurredOn,
    });
  }
}
