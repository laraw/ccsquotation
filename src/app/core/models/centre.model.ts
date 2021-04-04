import { Offering } from './offering.model'
import { CentrePhotos } from './centre-photos.model'
import { CentreOpening } from './centre-opening.model'
export interface Centre {
  id: number;
  name: string;
  address: string;
  suburb: string;
  postcode: string;
  state: string;
  country: string;
  phone: string;
  lat: number;
  long: number;
  description: string;
  nqsrating: string;
  email: string;
  
  offering: Offering[];
  photos: CentrePhotos[];
  opening: CentreOpening[];

}
