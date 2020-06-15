import { element, by, ElementFinder } from 'protractor';

export class ProfilePartSimpleItemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-profile-part-simple-item div table .btn-danger'));
  title = element.all(by.css('jhi-profile-part-simple-item div h2#page-heading span')).first();
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

export class ProfilePartSimpleItemUpdatePage {
  pageTitle = element(by.id('jhi-profile-part-simple-item-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  subTitleInput = element(by.id('field_subTitle'));
  dateInput = element(by.id('field_date'));
  contentInput = element(by.id('field_content'));

  simpleItemsSelect = element(by.id('field_simpleItems'));

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

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async setContentInput(content: string): Promise<void> {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput(): Promise<string> {
    return await this.contentInput.getAttribute('value');
  }

  async simpleItemsSelectLastOption(): Promise<void> {
    await this.simpleItemsSelect.all(by.tagName('option')).last().click();
  }

  async simpleItemsSelectOption(option: string): Promise<void> {
    await this.simpleItemsSelect.sendKeys(option);
  }

  getSimpleItemsSelect(): ElementFinder {
    return this.simpleItemsSelect;
  }

  async getSimpleItemsSelectedOption(): Promise<string> {
    return await this.simpleItemsSelect.element(by.css('option:checked')).getText();
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

export class ProfilePartSimpleItemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-profilePartSimpleItem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-profilePartSimpleItem'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
