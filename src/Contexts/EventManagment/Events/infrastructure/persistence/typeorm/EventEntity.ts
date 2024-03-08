import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Event } from '../../../domain/Event';
import { EventId } from '../../../domain/EventId';
import { EventTitle } from '../../../domain/EventTitle';
import { EventDate } from '../../../domain/EventDate';
import { EventTotalTicket } from '../../../domain/EventTotalTicket';
import { UserId } from '../../../../Shared/domain/UserId';
import { LotEntity } from '../../../../Lots/infrastructure/persistence/typeorm/LotEntity';

export const EventEntity = new EntitySchema<Event>({
  name: 'Event',
  tableName: 'events',
  target: Event,

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(EventId),
    },
    title: {
      type: String,
      transformer: ValueObjectTransformer(EventTitle),
    },
    eventDate: {
      name: 'event_day',
      type: 'timestamp',
      transformer: ValueObjectTransformer(EventDate),
    },
    totalTickets: {
      name: 'total_tickets',
      type: Number,
      transformer: ValueObjectTransformer(EventTotalTicket),
    },
    dateStartBuy: {
      name: 'date_start_buy',
      type: 'timestamp',
      transformer: ValueObjectTransformer(EventDate),
    },
    dateEndBuy: {
      name: 'date_end_buy',
      type: 'timestamp',
      transformer: ValueObjectTransformer(EventDate),
    },
    createdAt: {
      name: 'created_at',
      type: 'timestamp',
      default: 'CURRENT_TIMESTAMP',
      transformer: ValueObjectTransformer(EventDate),
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      default: null,
      transformer: ValueObjectTransformer(EventDate),
      updateDate: true,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'timestamp',
      default: null,
      transformer: ValueObjectTransformer(EventDate),
      deleteDate: true,
    },
    idUser: {
      name: 'id_user',
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
  },
  relations: {
    lots: {
      target: LotEntity,
      type: 'one-to-many',
      cascade: true,
    },
  },
});
