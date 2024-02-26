import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';

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
export class CommonComponent implements OnInit {
  @Input({ required: true }) clientName?: string;
  @Input({ required: true }) greeting?: string;

  constructor(@Inject(LOCALE_ID) readonly locale: string) { }

  ngOnInit(): void {
    console.log("Locale:", this.locale);
  }
}
