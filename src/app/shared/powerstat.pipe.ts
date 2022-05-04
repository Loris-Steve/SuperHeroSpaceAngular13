import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'powerstat',
})
export class PowerstatPipe implements PipeTransform {
  transform(value: number) {
    let html = '';
    switch (true) {
      case value < 25: html += `red`; break;
      case value < 50: html += `orange`; break;
      case value < 75: html += `yellow`; break;
      case value < 100: html += `green`; break;
    }
    return html;
  }
}
