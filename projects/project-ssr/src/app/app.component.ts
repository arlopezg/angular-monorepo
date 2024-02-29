import { Component, Inject, LOCALE_ID, afterRender } from '@angular/core';
import { CommonComponent } from '@common-pkg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonComponent],
  template: `<lib-common [greeting]="greeting" clientName="SSR App"/>`,
})
export class AppComponent {
  readonly greeting = $localize`:@@welcomeTo:Welcome to`;

  constructor(@Inject(LOCALE_ID) private locale: string) {
    console.log("Locale:", this.locale);

    afterRender(() => {
      console.log("Rendering on browser!");
    })
  }
}
