import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { User } from '../../../domain/User';
import { UserId } from '../../../../Shared/domain/UserId';
import { UserUsername } from '../../../domain/UserUsername';
import { UserFirstName } from '../../../domain/UserFirstName';
import { UserLastName } from '../../../domain/UserLastName';

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,

  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserId),
    },
    username: {
      type: String,
      transformer: ValueObjectTransformer(UserUsername),
    },

    firstName: {
      name: 'first_name',
      type: String,
      transformer: ValueObjectTransformer(UserFirstName),
    },
    lastName: {
      name: 'last_name',
      type: String,
      transformer: ValueObjectTransformer(UserLastName),
    },
  },
});
