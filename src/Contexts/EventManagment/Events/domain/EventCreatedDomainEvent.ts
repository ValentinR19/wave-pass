import { DomainEvent } from '../../../Shared/domain/DomainEvent';

type CreateEventDomainEventAttributes = {
  readonly title: string;
  readonly eventDate: string;
  readonly description: string;
  readonly totalTickets: number;
  readonly idUsuario: string;
  readonly dateStartBuy: string;
  readonly dateEndBuy: string;
};

export class EventCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'event.created';

  readonly title: string;
  readonly eventDate: string;
  readonly description: string;
  readonly totalTickets: number;
  readonly idUsuario: string;
  readonly dateStartBuy: string;
  readonly dateEndBuy: string;

  constructor({
    aggregateId,
    title,
    eventDate,
    description,
    totalTickets,
    idUsuario,
    dateStartBuy,
    dateEndBuy,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    title: string;
    eventDate: string;
    description: string;
    totalTickets: number;
    idUsuario: string;
    dateStartBuy: string;
    dateEndBuy: string;
    occurredOn?: Date;
  }) {
    super({ eventName: EventCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
    this.title = title;
    this.eventDate = eventDate;
    this.description = description;
    this.totalTickets = totalTickets;
    this.idUsuario = idUsuario;
    this.dateStartBuy = dateStartBuy;
    this.dateEndBuy = dateEndBuy;
  }

  toPrimitives(): CreateEventDomainEventAttributes {
    const { title, eventDate, description, totalTickets, idUsuario, dateStartBuy, dateEndBuy } = this;
    return {
      title,
      eventDate,
      description,
      totalTickets,
      idUsuario,
      dateStartBuy,
      dateEndBuy,
    };
  }

  static fromPrimitives(params: { aggregateId: string; attributes: CreateEventDomainEventAttributes; eventId: string; occurredOn: Date }): DomainEvent {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new EventCreatedDomainEvent({
      aggregateId,
      title: attributes.title,
      eventDate: attributes.eventDate,
      totalTickets: attributes.totalTickets,
      description: attributes.description,
      idUsuario: attributes.idUsuario,
      dateStartBuy: attributes.dateStartBuy,
      dateEndBuy: attributes.dateEndBuy,
      eventId,
      occurredOn,
    });
  }
}
