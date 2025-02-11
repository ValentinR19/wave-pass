import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { LotId } from '../../../domain/LotId';
import { Lot } from '../../../domain/Lot';
import { LotName } from '../../../domain/LotName';
import { LotTotalTicket } from '../../../domain/LotTotalTicket';
import { LotPrice } from '../../../domain/LotPrice';
import { EventId } from '../../../../Events/domain/EventId';
import { EventEntity } from '../../../../Events/infrastructure/persistence/typeorm/EventEntity';

export const LotEntity = new EntitySchema<Lot>({
  name: 'Lot',
  tableName: 'lots',
  target: Lot,

  columns: {
    id: {
      name: 'id',
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(LotId),
    },
    name: {
      name: 'name',
      type: String,
      transformer: ValueObjectTransformer(LotName),
    },
    totalTicket: {
      name: 'total_ticket',
      type: Number,
      transformer: ValueObjectTransformer(LotTotalTicket),
    },
    price: {
      name: 'price',
      type: Number,
      transformer: ValueObjectTransformer(LotPrice),
    },
    idEvent: {
      name: 'id_event',
      type: Number,
      transformer: ValueObjectTransformer(EventId),
    },
  },
  relations: {
    event: {
      target: EventEntity,
      type: 'many-to-one',
      cascade: ['remove', 'soft-remove'],
      joinColumn: { name: 'id_event', referencedColumnName: 'id' },
      inverseSide: 'lots',
    },
  },
});
