import { element, by, ElementFinder } from 'protractor';

export class ProfilePartComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-profile-part div table .btn-danger'));
  title = element.all(by.css('jhi-profile-part div h2#page-heading span')).first();
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

export class ProfilePartUpdatePage {
  pageTitle = element(by.id('jhi-profile-part-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  typeSelect = element(by.id('field_type'));
  indexInput = element(by.id('field_index'));
  orderSelect = element(by.id('field_order'));

  categoriesSelect = element(by.id('field_categories'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setTypeSelect(type: string): Promise<void> {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect(): Promise<string> {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption(): Promise<void> {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }

  async setIndexInput(index: string): Promise<void> {
    await this.indexInput.sendKeys(index);
  }

  async getIndexInput(): Promise<string> {
    return await this.indexInput.getAttribute('value');
  }

  async setOrderSelect(order: string): Promise<void> {
    await this.orderSelect.sendKeys(order);
  }

  async getOrderSelect(): Promise<string> {
    return await this.orderSelect.element(by.css('option:checked')).getText();
  }

  async orderSelectLastOption(): Promise<void> {
    await this.orderSelect.all(by.tagName('option')).last().click();
  }

  async categoriesSelectLastOption(): Promise<void> {
    await this.categoriesSelect.all(by.tagName('option')).last().click();
  }

  async categoriesSelectOption(option: string): Promise<void> {
    await this.categoriesSelect.sendKeys(option);
  }

  getCategoriesSelect(): ElementFinder {
    return this.categoriesSelect;
  }

  async getCategoriesSelectedOption(): Promise<string> {
    return await this.categoriesSelect.element(by.css('option:checked')).getText();
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

export class ProfilePartDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-profilePart-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-profilePart'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
