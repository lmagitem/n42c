import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import './vendor';
import { N42CSharedModule } from 'app/shared/shared.module';
import { N42CCoreModule } from 'app/core/core.module';
import { N42CAppRoutingModule } from './app-routing.module';
import { N42CHomeModule } from './home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';
import localeDe from '@angular/common/locales/de';
import localeRu from '@angular/common/locales/ru';
import localeJa from '@angular/common/locales/ja';
import localeEl from '@angular/common/locales/el';
import localeKo from '@angular/common/locales/ko';
import localeZh from '@angular/common/locales/zh';
import localeAr from '@angular/common/locales/ar';
import localeSv from '@angular/common/locales/sv';
import localePl from '@angular/common/locales/pl';

// To enable locale usage
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeEs, 'es');
registerLocaleData(localeDe, 'de');
registerLocaleData(localeRu, 'ru');
registerLocaleData(localeJa, 'ja');
registerLocaleData(localeEl, 'el');
registerLocaleData(localeKo, 'ko');
registerLocaleData(localeZh, 'zh');
registerLocaleData(localeAr, 'ar');
registerLocaleData(localeSv, 'sv');
registerLocaleData(localePl, 'pl');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    N42CSharedModule,
    N42CCoreModule,
    N42CHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    N42CAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class N42CAppModule {}
