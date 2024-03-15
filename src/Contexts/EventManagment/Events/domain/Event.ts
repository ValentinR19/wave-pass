import { AggregateRoot } from '../../../Shared/domain/AgregateRoot';
import { UserId } from '../../Shared/domain/UserId';
import { User } from '../../Users/domain/User';
import { EventCreatedDomainEvent } from './EventCreatedDomainEvent';
import { EventDate } from './EventDate';
import { EventDescription } from './EventDescription';
import { EventId } from './EventId';
import { EventTitle } from './EventTitle';
import { EventTotalTicket } from './EventTotalTicket';

export class Event extends AggregateRoot {
  id: EventId;

  title: EventTitle;

  eventDate: EventDate;

  description: EventDescription;

  totalTickets: EventTotalTicket;

  dateStartBuy: EventDate;

  dateEndBuy: EventDate;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;

  idUser: UserId;

  user: User;

  constructor(
    id: EventId,
    title: EventTitle,
    eventDate: EventDate,
    description: EventDescription,
    totalTickets: EventTotalTicket,
    idUser: UserId,
    dateStartBuy: EventDate,
    dateEndBuy: EventDate,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.eventDate = eventDate;
    this.description = description;
    this.totalTickets = totalTickets;
    this.idUser = idUser;
    this.dateStartBuy = dateStartBuy;
    this.dateEndBuy = dateEndBuy;
  }

  static create(
    id: EventId,
    title: EventTitle,
    eventDate: EventDate,
    description: EventDescription,
    totalTickets: EventTotalTicket,
    idUser: UserId,
    dateStartBuy: EventDate,
    dateEndBuy: EventDate,
  ): Event {
    const event = new Event(id, title, eventDate, description, totalTickets, idUser, dateStartBuy, dateEndBuy);
    event.record(
      new EventCreatedDomainEvent({
        aggregateId: event.id.value,
        title: event.title.value,
        eventDate: event.eventDate.value,
        description: event.description.value,
        totalTickets: event.totalTickets.value,
        idUsuario: event.idUser.value,
        dateStartBuy: event.dateStartBuy.value,
        dateEndBuy: event.dateEndBuy.value,
      }),
    );

    return event;
  }

  static fromPrimitives(plainData: {
    id: string;
    title: string;
    eventDate: string;
    description: string;
    totalTickets: number;
    idUser: string;
    dateStartBuy: string;
    dateEndBuy: string;
  }): Event {
    return new Event(
      new EventId(plainData.id),
      new EventTitle(plainData.title),
      new EventDate(plainData.eventDate),
      new EventDescription(plainData.description),
      new EventTotalTicket(plainData.totalTickets),
      new UserId(plainData.idUser),
      new EventDate(plainData.dateStartBuy),
      new EventDate(plainData.dateEndBuy),
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      eventDate: this.eventDate.value,
      description: this.description.value,
      totalTickets: this.totalTickets.value,
      dateStartBuy: this.dateStartBuy.value,
      dateEndBuy: this.dateEndBuy.value,
      idUser: this.idUser.value,
    };
  }
}
