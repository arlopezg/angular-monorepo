import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-common',
  standalone: true,
  template: `<p>Running client "{{this.clientName}}" works!</p>`,
})
export class CommonComponent {
  @Input({ required: true }) clientName?: string;
}
