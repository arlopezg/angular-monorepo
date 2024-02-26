import { Component } from '@angular/core';
import { CommonComponent } from '@common-pkg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonComponent],
  template: `<lib-common greeting="Welcome to" clientName="SSR App"/>`,
})
export class AppComponent {
}
