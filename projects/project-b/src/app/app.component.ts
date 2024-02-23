import { Component } from '@angular/core';

import { CommonComponent } from '@common-pkg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonComponent],
  template: `
    <h1>Welcome to {{title}}!</h1>
    <lib-common/>
  `,
})
export class AppComponent {
  title = 'project-b';
}
