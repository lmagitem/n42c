import { element, by, ElementFinder } from 'protractor';

export class LocalizedNinthStratagemGroupComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-localized-ninth-stratagem-group div table .btn-danger'));
  title = element.all(by.css('jhi-localized-ninth-stratagem-group div h2#page-heading span')).first();
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

export class LocalizedNinthStratagemGroupUpdatePage {
  pageTitle = element(by.id('jhi-localized-ninth-stratagem-group-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  languageSelect = element(by.id('field_language'));

  stratagemGroupSelect = element(by.id('field_stratagemGroup'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
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

  async stratagemGroupSelectLastOption(): Promise<void> {
    await this.stratagemGroupSelect.all(by.tagName('option')).last().click();
  }

  async stratagemGroupSelectOption(option: string): Promise<void> {
    await this.stratagemGroupSelect.sendKeys(option);
  }

  getStratagemGroupSelect(): ElementFinder {
    return this.stratagemGroupSelect;
  }

  async getStratagemGroupSelectedOption(): Promise<string> {
    return await this.stratagemGroupSelect.element(by.css('option:checked')).getText();
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

export class LocalizedNinthStratagemGroupDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-localizedNinthStratagemGroup-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-localizedNinthStratagemGroup'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
