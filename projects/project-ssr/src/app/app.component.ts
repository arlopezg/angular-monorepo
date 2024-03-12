import { Component, Inject, LOCALE_ID, PLATFORM_ID, afterRender } from '@angular/core';
import { CommonComponent } from '@common-pkg';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonComponent],
  template: `<lib-common [greeting]="greeting" [clientName]="appName"/>`,
})
export class AppComponent {
  readonly appName: string;
  readonly greeting = $localize`:@@welcomeTo:Welcome to`;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    @Inject(PLATFORM_ID) public platformId: string,
  ) {
    this.appName = [this.platformId, "app"].join(" ");

    console.log("Locale:", this.locale);

    afterRender(() => {
      console.log("Rendering on browser!");
    })
  }
}
