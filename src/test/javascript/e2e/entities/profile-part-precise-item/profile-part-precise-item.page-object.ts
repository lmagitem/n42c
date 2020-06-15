import { element, by, ElementFinder } from 'protractor';

export class ProfilePartPreciseItemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-profile-part-precise-item div table .btn-danger'));
  title = element.all(by.css('jhi-profile-part-precise-item div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ProfilePartPreciseItemUpdatePage {
  pageTitle = element(by.id('jhi-profile-part-precise-item-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  subTitleInput = element(by.id('field_subTitle'));
  startInput = element(by.id('field_start'));
  endInput = element(by.id('field_end'));
  locationNameInput = element(by.id('field_locationName'));
  locationLatInput = element(by.id('field_locationLat'));
  locationLongInput = element(by.id('field_locationLong'));
  contentInput = element(by.id('field_content'));

  preciseItemsSelect = element(by.id('field_preciseItems'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setSubTitleInput(subTitle: string): Promise<void> {
    await this.subTitleInput.sendKeys(subTitle);
  }

  async getSubTitleInput(): Promise<string> {
    return await this.subTitleInput.getAttribute('value');
  }

  async setStartInput(start: string): Promise<void> {
    await this.startInput.sendKeys(start);
  }

  async getStartInput(): Promise<string> {
    return await this.startInput.getAttribute('value');
  }

  async setEndInput(end: string): Promise<void> {
    await this.endInput.sendKeys(end);
  }

  async getEndInput(): Promise<string> {
    return await this.endInput.getAttribute('value');
  }

  async setLocationNameInput(locationName: string): Promise<void> {
    await this.locationNameInput.sendKeys(locationName);
  }

  async getLocationNameInput(): Promise<string> {
    return await this.locationNameInput.getAttribute('value');
  }

  async setLocationLatInput(locationLat: string): Promise<void> {
    await this.locationLatInput.sendKeys(locationLat);
  }

  async getLocationLatInput(): Promise<string> {
    return await this.locationLatInput.getAttribute('value');
  }

  async setLocationLongInput(locationLong: string): Promise<void> {
    await this.locationLongInput.sendKeys(locationLong);
  }

  async getLocationLongInput(): Promise<string> {
    return await this.locationLongInput.getAttribute('value');
  }

  async setContentInput(content: string): Promise<void> {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput(): Promise<string> {
    return await this.contentInput.getAttribute('value');
  }

  async preciseItemsSelectLastOption(): Promise<void> {
    await this.preciseItemsSelect.all(by.tagName('option')).last().click();
  }

  async preciseItemsSelectOption(option: string): Promise<void> {
    await this.preciseItemsSelect.sendKeys(option);
  }

  getPreciseItemsSelect(): ElementFinder {
    return this.preciseItemsSelect;
  }

  async getPreciseItemsSelectedOption(): Promise<string> {
    return await this.preciseItemsSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ProfilePartPreciseItemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-profilePartPreciseItem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-profilePartPreciseItem'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
