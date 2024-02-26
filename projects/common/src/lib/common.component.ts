import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';

@Component({
  selector: 'lib-common',
  standalone: true,
  template: `<p>Running client "{{this.clientName}}" works! ({{this.locale}})</p>`,
})
export class CommonComponent implements OnInit {
  constructor(@Inject(LOCALE_ID) readonly locale: string) { }

  @Input({ required: true }) clientName?: string;

  ngOnInit(): void {
    console.log("Locale:", this.locale);
  }
}
