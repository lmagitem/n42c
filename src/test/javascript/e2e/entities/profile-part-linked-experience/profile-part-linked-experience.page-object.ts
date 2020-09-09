import { element, by, ElementFinder } from 'protractor';

export class ProfilePartLinkedExperienceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-profile-part-linked-experience div table .btn-danger'));
  title = element.all(by.css('jhi-profile-part-linked-experience div h2#page-heading span')).first();
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

export class ProfilePartLinkedExperienceUpdatePage {
  pageTitle = element(by.id('jhi-profile-part-linked-experience-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  subTitleInput = element(by.id('field_subTitle'));
  dateInput = element(by.id('field_date'));
  contentInput = element(by.id('field_content'));

  linkedItemSelect = element(by.id('field_linkedItem'));

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

  async linkedItemSelectLastOption(): Promise<void> {
    await this.linkedItemSelect.all(by.tagName('option')).last().click();
  }

  async linkedItemSelectOption(option: string): Promise<void> {
    await this.linkedItemSelect.sendKeys(option);
  }

  getLinkedItemSelect(): ElementFinder {
    return this.linkedItemSelect;
  }

  async getLinkedItemSelectedOption(): Promise<string> {
    return await this.linkedItemSelect.element(by.css('option:checked')).getText();
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

export class ProfilePartLinkedExperienceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-profilePartLinkedExperience-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-profilePartLinkedExperience'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
