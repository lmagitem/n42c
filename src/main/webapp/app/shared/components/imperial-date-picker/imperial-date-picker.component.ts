import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ImperialDateConverter } from 'app/shared/util/imperial-date-converter';
import * as moment from 'moment';

@Component({
  selector: 'jhi-imperial-date-picker',
  templateUrl: './imperial-date-picker.component.html',
  styleUrls: ['./imperial-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImperialDatePickerComponent {
  gregorianDisplay = false;
  date = new Date(40500, 1, 1, 12, 30, 0, 0);
  check = 0;
  imperialFraction = 0;
  imperialYear = 50;
  imperialMillenia = 40;
  /** The form in which to get and update values. */
  _form = new FormGroup({});
  @Input()
  set form(form: FormGroup) {
    this._form = form;
    this.updateFromForm();
  }
  get form(): FormGroup {
    return this._form;
  }
  /** The string to use in order to get the "Check" field from the given form. */
  _checkName = '';
  @Input()
  set checkName(checkName: string) {
    this._checkName = checkName;
    this.updateFromForm();
  }
  get checkName(): string {
    return this._checkName;
  }
  /** The string to use in order to get the "Instant" field from the given form. */
  _instantName = '';
  @Input()
  set instantName(instantName: string) {
    this._instantName = instantName;
    this.updateFromForm();
  }
  get instantName(): string {
    return this._instantName;
  }

  /** Update the component using the content of a form. */
  updateFromForm(): void {
    if (this.instantName !== '' && this.checkName !== '') {
      this.updateInputsFromDate(moment(this.form.get(this.instantName)?.value, DATE_TIME_FORMAT).toDate());
    }
  }

  /** Update the value of the "Check" field, in the component and the form. */
  updateCheck(check: Event): void {
    this.check = Number.parseInt((check.target as HTMLTextAreaElement).value, 10);
    this.updateForm();
  }

  /** Update the values of the component and the form using the Imperial Dating system. */
  updateFromImperial(fraction: number | Event, year: number | Event, millenia: number | Event): void {
    if (fraction instanceof Event) {
      fraction = Number.parseInt((fraction.target as HTMLTextAreaElement).value, 10);
      this.imperialFraction = fraction;
    }
    if (year instanceof Event) {
      year = Number.parseInt((year.target as HTMLTextAreaElement).value, 10);
      this.imperialYear = year;
    }
    if (millenia instanceof Event) {
      millenia = Number.parseInt((millenia.target as HTMLTextAreaElement).value, 10);
      this.imperialMillenia = millenia;
    }

    this.date = ImperialDateConverter.convertToGregorian(this.imperialFraction, this.imperialYear, this.imperialMillenia);
    this.updateForm();
  }

  /** Update the values of the component and the form using our good old Gregorian calendar. */
  updateFromGregorianDate(date: string | Event, time: string | Event): void {
    if (date instanceof Event) {
      date = (date.target as HTMLTextAreaElement).value;

      const splittedDate = date.split('-');
      if (splittedDate.length > 1 && splittedDate[0] !== '') {
        const year = Number.parseInt(splittedDate[0], 10);
        const month = Number.parseInt(splittedDate[1], 10) - 1;
        const day = Number.parseInt(splittedDate[2], 10);
        this.date = new Date(year, month, day, this.date.getHours(), this.date.getMinutes(), this.date.getSeconds());
      }
    }
    if (time instanceof Event) {
      time = (time.target as HTMLTextAreaElement).value;

      const splittedTime = time.split(':');
      if (splittedTime.length > 0 && splittedTime[0] !== '') {
        const hours = Number.parseInt(splittedTime[0], 10);
        const minutes = Number.parseInt(splittedTime[1], 10);
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), hours, minutes, this.date.getSeconds());
      }
    }

    this.updateForm();
  }

  /** Update the form using the component's attributes. */
  updateForm(): void {
    this.updateInputsFromDate(this.date);
    this.form.get(this.checkName)?.setValue(this.check);
    this.form.get(this.instantName)?.setValue(this.date);
  }

  /** Update the Imperial Dating system part of the component using the given date. */
  updateInputsFromDate(newDate: Date): void {
    this.date = ImperialDateConverter.isValidDate(newDate) ? newDate : this.date;
    this.imperialFraction = ImperialDateConverter.calculateImperialFraction(this.date);
    this.imperialYear = ImperialDateConverter.calculateImperialYear(this.date);
    this.imperialMillenia = ImperialDateConverter.calculateImperialMillenia(this.date);
  }
}
