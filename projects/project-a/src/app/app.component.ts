import { Component } from '@angular/core';

import { CommonComponent } from '@common-pkg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonComponent],
  template: `<lib-common clientName="CSR App"/>`,
})
export class AppComponent { }
