import { AggregateRoot } from '../../../Shared/domain/AgregateRoot';
import { CityId } from './Cities/CityId';
import { LocationAdress } from './LocationAdress';
import { LocationId } from './LocationId';
import { LocationNote } from './LocationNote';

export class Location extends AggregateRoot {
  id: LocationId;
  idCity: CityId;
  adress: LocationAdress;
  notes: LocationNote;

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
