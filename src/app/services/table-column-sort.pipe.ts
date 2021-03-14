import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from '../model/todo';

@Pipe({
  name: 'tableColumnSort'
})
export class TableColumnSortPipe implements PipeTransform {

  transform(list: Todo[], field: string, asc: boolean = true) {
    if (field === null) {
      return list;
    }

    if (asc) {
      return list.sort((a, b) => a[field] > b[field] ? 1 : -1);
    } else {
      return list.sort((a, b) => a[field] < b[field] ? 1 : -1);
    }
  }

}
