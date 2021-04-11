
import { ResponseModel } from './responseModel';
// tslint:disable-next-line:no-empty-interface
export interface  SingleResponseModel<T> extends ResponseModel {
  data: T;
}
