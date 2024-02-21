import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { User } from '../../../domain/User';
import { UserId } from '../../../domain/UserId';
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
      type: String,
      transformer: ValueObjectTransformer(UserFirstName),
    },
    lastName: {
      type: String,
      transformer: ValueObjectTransformer(UserLastName),
    },
  },
});
