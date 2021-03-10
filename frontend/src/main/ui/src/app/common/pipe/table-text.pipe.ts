import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableText'
})
export class TableTextPipe implements PipeTransform {

  transform(value: string | null): unknown {
    if(value == null) {
      return null;
    }
    return value.substring(0, 45) + "...";
  }

}
