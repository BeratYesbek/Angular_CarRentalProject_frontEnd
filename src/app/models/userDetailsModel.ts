import {UserImageModel} from 'src/app/models/userImageModel';
export interface UserDetailsModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string[];
  passwordSalt: string[];
  customerId: number[];
  findeskScore: number[];
  adminId: number[];
  images: UserImageModel[];
  status: boolean;
}
