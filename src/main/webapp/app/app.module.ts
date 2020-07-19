import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { N42CSharedModule } from 'app/shared/shared.module';
import { N42CCoreModule } from 'app/core/core.module';
import { N42CAppRoutingModule } from './app-routing.module';
import { N42CHomeModule } from './home/home.module';
import { N42CEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    N42CSharedModule,
    N42CCoreModule,
    N42CHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    N42CEntityModule,
    N42CAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class N42CAppModule {}