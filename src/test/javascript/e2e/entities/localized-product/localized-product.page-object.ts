import { element, by, ElementFinder } from 'protractor';

export class LocalizedProductComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-localized-product div table .btn-danger'));
  title = element.all(by.css('jhi-localized-product div h2#page-heading span')).first();
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

export class LocalizedProductUpdatePage {
  pageTitle = element(by.id('jhi-localized-product-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  excerptInput = element(by.id('field_excerpt'));
  pictureUrlInput = element(by.id('field_pictureUrl'));
  contentInput = element(by.id('field_content'));
  languageSelect = element(by.id('field_language'));

  productSelect = element(by.id('field_product'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setExcerptInput(excerpt: string): Promise<void> {
    await this.excerptInput.sendKeys(excerpt);
  }

  async getExcerptInput(): Promise<string> {
    return await this.excerptInput.getAttribute('value');
  }

  async setPictureUrlInput(pictureUrl: string): Promise<void> {
    await this.pictureUrlInput.sendKeys(pictureUrl);
  }

  async getPictureUrlInput(): Promise<string> {
    return await this.pictureUrlInput.getAttribute('value');
  }

  async setContentInput(content: string): Promise<void> {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput(): Promise<string> {
    return await this.contentInput.getAttribute('value');
  }

  async setLanguageSelect(language: string): Promise<void> {
    await this.languageSelect.sendKeys(language);
  }

  async getLanguageSelect(): Promise<string> {
    return await this.languageSelect.element(by.css('option:checked')).getText();
  }

  async languageSelectLastOption(): Promise<void> {
    await this.languageSelect.all(by.tagName('option')).last().click();
  }

  async productSelectLastOption(): Promise<void> {
    await this.productSelect.all(by.tagName('option')).last().click();
  }

  async productSelectOption(option: string): Promise<void> {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption(): Promise<string> {
    return await this.productSelect.element(by.css('option:checked')).getText();
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

export class LocalizedProductDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-localizedProduct-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-localizedProduct'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
