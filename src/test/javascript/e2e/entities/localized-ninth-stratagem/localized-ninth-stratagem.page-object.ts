import { element, by, ElementFinder } from 'protractor';

export class LocalizedNinthStratagemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-localized-ninth-stratagem div table .btn-danger'));
  title = element.all(by.css('jhi-localized-ninth-stratagem div h2#page-heading span')).first();
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

export class LocalizedNinthStratagemUpdatePage {
  pageTitle = element(by.id('jhi-localized-ninth-stratagem-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  summaryInput = element(by.id('field_summary'));
  descriptionInput = element(by.id('field_description'));
  keywordsInput = element(by.id('field_keywords'));
  languageSelect = element(by.id('field_language'));

  stratagemSelect = element(by.id('field_stratagem'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSummaryInput(summary: string): Promise<void> {
    await this.summaryInput.sendKeys(summary);
  }

  async getSummaryInput(): Promise<string> {
    return await this.summaryInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setKeywordsInput(keywords: string): Promise<void> {
    await this.keywordsInput.sendKeys(keywords);
  }

  async getKeywordsInput(): Promise<string> {
    return await this.keywordsInput.getAttribute('value');
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

  async stratagemSelectLastOption(): Promise<void> {
    await this.stratagemSelect.all(by.tagName('option')).last().click();
  }

  async stratagemSelectOption(option: string): Promise<void> {
    await this.stratagemSelect.sendKeys(option);
  }

  getStratagemSelect(): ElementFinder {
    return this.stratagemSelect;
  }

  async getStratagemSelectedOption(): Promise<string> {
    return await this.stratagemSelect.element(by.css('option:checked')).getText();
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

export class LocalizedNinthStratagemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-localizedNinthStratagem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-localizedNinthStratagem'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
