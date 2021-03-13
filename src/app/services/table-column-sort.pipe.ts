import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from '../model/todo';

@Pipe({
  name: 'tableColumnSort'
})
export class TableColumnSortPipe implements PipeTransform {

  transform(list: Todo[], attrBy: string, asc: boolean = true) {
    if (attrBy === null) {
      return list;
    }

    if (asc) {
      return list.sort((a, b) => a[attrBy] > b[attrBy] ? 1 : -1);
    } else {
      return list.sort((a, b) => a[attrBy] < b[attrBy] ? 1 : -1);
    }
  }

}
