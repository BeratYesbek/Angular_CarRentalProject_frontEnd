import { Url } from "url";
import { CarImage } from "./CarImage";
import { Rental } from './rental'
export interface CarDetailModel {
  carId: number;
  categoryId: number;
  brandId: number;
  categoryName: string;
  colorId: number;
  colorName: string;
  modelYear: number;
  modelName: string;
  brandName: string;
  description: string;
  carImages: CarImage[];
  rentals: Rental[];
  dailyPrice: number;
  findeksScore: number;
  isRented: boolean;

}
