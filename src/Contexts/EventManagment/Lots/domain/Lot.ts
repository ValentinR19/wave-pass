import { AggregateRoot } from '../../../Shared/domain/AgregateRoot';
import { Event } from '../../Events/domain/Event';
import { EventId } from '../../Events/domain/EventId';
import { LotCreatedDomainEvent } from './LotCreatedDomainEvent';
import { LotId } from './LotId';
import { LotName } from './LotName';
import { LotPrice } from './LotPrice';
import { LotTotalTicket } from './LotTotalTicket';

export class Lot extends AggregateRoot {
  id: LotId;

  name: LotName;

  totalTicket: LotTotalTicket;

  price: LotPrice;

  idEvent: EventId;

  event: Event;

  constructor(id: LotId, name: LotName, totalTicket: LotTotalTicket, price: LotPrice, idEvent: EventId) {
    super();
    this.id = id;
    this.name = name;
    this.totalTicket = totalTicket;
    this.price = price;
    this.idEvent = idEvent;
  }

  static create(id: LotId, name: LotName, totalTicket: LotTotalTicket, price: LotPrice, idEvent: EventId): Lot {
    const lot = new Lot(id, name, totalTicket, price, idEvent);
    lot.record(
      new LotCreatedDomainEvent({
        aggregateId: lot.id.value,
        name: lot.name.value,
        totalTicket: lot.totalTicket.value,
        price: lot.price.value,
        idEvent: lot.idEvent.value,
      }),
    );

    return lot;
  }

  static fromPrimitives(plainData: { id: string; name: string; totalTicket: number; price: number; idEvent: string }): Lot {
    return new Lot(new LotId(plainData.id), new LotName(plainData.name), new LotTotalTicket(plainData.totalTicket), new LotPrice(plainData.price), new EventId(plainData.idEvent));
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      totalTicket: this.totalTicket.value,
      price: this.price.value,
      idEvent: this.idEvent.value,
    };
  }
}
