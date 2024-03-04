import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { Event } from '../../../domain/Event';
import { EventId } from '../../../domain/EventId';
import { EventTitle } from '../../../domain/EventTitle';

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
  },
});
