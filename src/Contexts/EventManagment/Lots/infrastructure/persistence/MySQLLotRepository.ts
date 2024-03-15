import { EntitySchema } from 'typeorm';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { LotEntity } from './typeorm/LotEntity';
import { LotRepository } from '../../domain/LotRepository';
import { Lot } from '../../domain/Lot';

export class MySQLLotRepository extends TypeOrmRepository<Lot> implements LotRepository {
  protected entitySchema(): EntitySchema<Lot> {
    return LotEntity;
  }

  async save(lot: Lot): Promise<void> {
    await this.persist(lot);
  }
}
