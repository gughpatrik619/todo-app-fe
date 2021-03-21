import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterHighlight'
})
export class FilterHighlightPipe implements PipeTransform {

  transform(text: string, search: string): unknown {
    let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    pattern = pattern.split(' ').filter((t) => {
      return t.length > 0;
    }).join('|');
    const regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex, (match) => `<span class="bg-warning">${match}</span>`) : text;
  }
}
