import { NgModule } from '@angular/core';
import { N42CSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './pipes/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImperialDatePickerComponent } from './components/imperial-date-picker/imperial-date-picker.component';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  imports: [RouterModule, N42CSharedLibsModule, CommonModule, FormsModule, ReactiveFormsModule, FileUploadModule],
  declarations: [
    FindLanguageFromKeyPipe,
    SafeUrlPipe,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    ImperialDatePickerComponent,
  ],
  exports: [
    N42CSharedLibsModule,
    FindLanguageFromKeyPipe,
    SafeUrlPipe,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    ImperialDatePickerComponent,
    FileUploadModule,
  ],
})
export class N42CSharedModule {}
