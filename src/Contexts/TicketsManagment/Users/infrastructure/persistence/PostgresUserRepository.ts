import { EntitySchema } from 'typeorm';
import { TypeOrmRepository } from '../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository';
import { UserRepository } from '../../domain/UserRepository';
import { User } from '../../domain/User';
import { UserEntity } from './typeorm/UserEntity';

export class PostgresUserRepository extends TypeOrmRepository<User> implements UserRepository {
  protected entitySchema(): EntitySchema<User> {
    return UserEntity;
  }

  async save(user: User): Promise<void> {
    await this.persist(user);
  }

  async searchAll(page: number, result: number) {
    // const repository = this.repository();
    // const Users = (await repository).createQueryBuilder('user').where('user.DeletedAt IS NULL');
  }

  matching(criteria: any) {
    throw new Error('Method not implemented.');
  }
}
