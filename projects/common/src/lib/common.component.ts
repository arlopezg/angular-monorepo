import { Component, Inject, Input, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'lib-common',
  standalone: true,
  template: `
  <section>
    <header>
      <h1>Works!</h1>
    </header>

    <p>{{ [greeting, clientName].join(" ") }} ({{locale}})</p>
  </section>
  `,
})
export class CommonComponent {
  @Input({ required: true }) clientName?: string;
  @Input({ required: true }) greeting?: string;

  constructor(@Inject(LOCALE_ID) readonly locale: string) { }
}
