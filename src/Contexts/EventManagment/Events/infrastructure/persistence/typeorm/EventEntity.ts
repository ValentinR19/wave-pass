import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Event } from '../../../domain/Event';
import { EventId } from '../../../domain/EventId';
import { EventTitle } from '../../../domain/EventTitle';
import { EventDate } from '../../../domain/EventDate';
import { EventTotalTicket } from '../../../domain/EventTotalTicket';
import { UserId } from '../../../../Shared/domain/UserId';
import { UserEntity } from '../../../../Users/infrastructure/persistence/typeorm/UserEntity';

export const EventEntity = new EntitySchema<Event>({
  name: 'Event',
  tableName: 'events',
  target: Event,

  columns: {
    id: {
      name: 'id',
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(EventId),
    },
    description: {
      name: 'description',
      type: String,
      transformer: ValueObjectTransformer(EventTitle),
    },

    title: {
      name: 'title',
      type: String,
      transformer: ValueObjectTransformer(EventTitle),
    },
    eventDate: {
      name: 'event_date',
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
      createDate: true,
    },
    updatedAt: {
      name: 'updated_at',
      type: 'timestamp',
      default: null,

      updateDate: true,
    },
    deletedAt: {
      name: 'deleted_at',
      type: 'timestamp',
      default: null,
      deleteDate: true,
    },
    idUser: {
      name: 'id_user',
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
  },
  relations: {
    user: {
      target: UserEntity,
      type: 'many-to-one',
      cascade: ['remove', 'soft-remove'],
      joinColumn: { name: 'id_user', referencedColumnName: 'id' },
      inverseSide: 'events',
    },
  },
});
