import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { LotId } from '../../../domain/LotId';
import { Lot } from '../../../domain/Lot';
import { LotName } from '../../../domain/LotName';
import { LotTotalTicket } from '../../../domain/LotTotalTicket';
import { LotPrice } from '../../../domain/LotPrice';
import { EventId } from '../../../../Events/domain/EventId';

export const LotEntity = new EntitySchema<Lot>({
  name: 'Lot',
  tableName: 'lots',
  target: Lot,

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(LotId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(LotName),
    },
    totalTicket: {
      name: 'total_ticket',
      type: Number,
      transformer: ValueObjectTransformer(LotTotalTicket),
    },
    price: {
      type: Number,
      transformer: ValueObjectTransformer(LotPrice),
    },
    idEvent: {
      name: 'id_event',
      type: Number,
      transformer: ValueObjectTransformer(EventId),
    },
  },
});
