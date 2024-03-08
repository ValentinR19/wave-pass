import { Lot } from './Lot';

export interface LotRepository {
  save(event: Lot): Promise<void>;
}
