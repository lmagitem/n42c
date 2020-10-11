import { NgModule } from '@angular/core';
import { N42CSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomizableImageComponent } from './components/customizable-image/customizable-image.component';
import { ImperialDatePickerComponent } from './components/imperial-date-picker/imperial-date-picker.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, N42CSharedLibsModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    CustomizableImageComponent,
    ImperialDatePickerComponent,
  ],
  exports: [
    N42CSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    CustomizableImageComponent,
    ImperialDatePickerComponent,
  ],
})
export class N42CSharedModule {}
