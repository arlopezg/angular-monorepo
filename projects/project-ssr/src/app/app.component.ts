import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonComponent } from '@common-pkg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonComponent],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <lib-common/>
  `,
})
export class AppComponent {
  title = 'project-ssr';
}
