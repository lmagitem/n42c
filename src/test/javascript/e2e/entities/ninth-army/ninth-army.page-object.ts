import { element, by, ElementFinder } from 'protractor';

export class NinthArmyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-army div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-army div h2#page-heading span')).first();
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

export class NinthArmyUpdatePage {
  pageTitle = element(by.id('jhi-ninth-army-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  crusadeInput = element(by.id('field_crusade'));
  factionSelect = element(by.id('field_faction'));
  subfactionSelect = element(by.id('field_subfaction'));

  authorSelect = element(by.id('field_author'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  getCrusadeInput(): ElementFinder {
    return this.crusadeInput;
  }

  async setFactionSelect(faction: string): Promise<void> {
    await this.factionSelect.sendKeys(faction);
  }

  async getFactionSelect(): Promise<string> {
    return await this.factionSelect.element(by.css('option:checked')).getText();
  }

  async factionSelectLastOption(): Promise<void> {
    await this.factionSelect.all(by.tagName('option')).last().click();
  }

  async setSubfactionSelect(subfaction: string): Promise<void> {
    await this.subfactionSelect.sendKeys(subfaction);
  }

  async getSubfactionSelect(): Promise<string> {
    return await this.subfactionSelect.element(by.css('option:checked')).getText();
  }

  async subfactionSelectLastOption(): Promise<void> {
    await this.subfactionSelect.all(by.tagName('option')).last().click();
  }

  async authorSelectLastOption(): Promise<void> {
    await this.authorSelect.all(by.tagName('option')).last().click();
  }

  async authorSelectOption(option: string): Promise<void> {
    await this.authorSelect.sendKeys(option);
  }

  getAuthorSelect(): ElementFinder {
    return this.authorSelect;
  }

  async getAuthorSelectedOption(): Promise<string> {
    return await this.authorSelect.element(by.css('option:checked')).getText();
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

export class NinthArmyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthArmy-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthArmy'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
