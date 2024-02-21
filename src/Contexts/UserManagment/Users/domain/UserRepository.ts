import { IPaginated } from '../../../Shared/domain/IPaginated';
import { User } from './User';

export interface UserRepository {
  save(user: User): Promise<void>;

  searchAll(page: number, result: number): Promise<IPaginated<User>>;

  matching(criteria: any): Promise<IPaginated<User>>;
}
