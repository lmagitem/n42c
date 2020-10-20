import { element, by, ElementFinder } from 'protractor';

export class ProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-product div table .btn-danger'));
  title = element.all(by.css('jhi-product div h2#page-heading span')).first();
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

export class ProductUpdatePage {
  pageTitle = element(by.id('jhi-product-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  authorsSelect = element(by.id('field_authors'));
  shopSelect = element(by.id('field_shop'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async authorsSelectLastOption(): Promise<void> {
    await this.authorsSelect.all(by.tagName('option')).last().click();
  }

  async authorsSelectOption(option: string): Promise<void> {
    await this.authorsSelect.sendKeys(option);
  }

  getAuthorsSelect(): ElementFinder {
    return this.authorsSelect;
  }

  async getAuthorsSelectedOption(): Promise<string> {
    return await this.authorsSelect.element(by.css('option:checked')).getText();
  }

  async shopSelectLastOption(): Promise<void> {
    await this.shopSelect.all(by.tagName('option')).last().click();
  }

  async shopSelectOption(option: string): Promise<void> {
    await this.shopSelect.sendKeys(option);
  }

  getShopSelect(): ElementFinder {
    return this.shopSelect;
  }

  async getShopSelectedOption(): Promise<string> {
    return await this.shopSelect.element(by.css('option:checked')).getText();
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

export class ProductDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-product-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-product'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
