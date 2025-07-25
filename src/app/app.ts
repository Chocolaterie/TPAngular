import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateDirective, TranslatePipe, TranslateService} from '@ngx-translate/core';

import translationsEN from "../assets/i18n/en.json";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslatePipe, TranslateDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tp-angular');

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.translate.setTranslation('en', translationsEN);
  }
}
