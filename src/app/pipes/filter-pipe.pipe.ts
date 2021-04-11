import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/Car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText = filterText ? filterText.toString().toLocaleLowerCase() : '';
    return filterText ? value.filter((c: Car) => c.modelName.toString().toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
