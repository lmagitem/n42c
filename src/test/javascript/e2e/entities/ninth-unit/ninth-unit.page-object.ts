import { element, by, ElementFinder } from 'protractor';

export class NinthUnitComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-unit div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-unit div h2#page-heading span')).first();
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

export class NinthUnitUpdatePage {
  pageTitle = element(by.id('jhi-ninth-unit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  datasheetInput = element(by.id('field_datasheet'));
  factionSelect = element(by.id('field_faction'));
  subfactionSelect = element(by.id('field_subfaction'));
  battlefieldRoleSelect = element(by.id('field_battlefieldRole'));
  keywordsInput = element(by.id('field_keywords'));

  ownerSelect = element(by.id('field_owner'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDatasheetInput(datasheet: string): Promise<void> {
    await this.datasheetInput.sendKeys(datasheet);
  }

  async getDatasheetInput(): Promise<string> {
    return await this.datasheetInput.getAttribute('value');
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

  async setBattlefieldRoleSelect(battlefieldRole: string): Promise<void> {
    await this.battlefieldRoleSelect.sendKeys(battlefieldRole);
  }

  async getBattlefieldRoleSelect(): Promise<string> {
    return await this.battlefieldRoleSelect.element(by.css('option:checked')).getText();
  }

  async battlefieldRoleSelectLastOption(): Promise<void> {
    await this.battlefieldRoleSelect.all(by.tagName('option')).last().click();
  }

  async setKeywordsInput(keywords: string): Promise<void> {
    await this.keywordsInput.sendKeys(keywords);
  }

  async getKeywordsInput(): Promise<string> {
    return await this.keywordsInput.getAttribute('value');
  }

  async ownerSelectLastOption(): Promise<void> {
    await this.ownerSelect.all(by.tagName('option')).last().click();
  }

  async ownerSelectOption(option: string): Promise<void> {
    await this.ownerSelect.sendKeys(option);
  }

  getOwnerSelect(): ElementFinder {
    return this.ownerSelect;
  }

  async getOwnerSelectedOption(): Promise<string> {
    return await this.ownerSelect.element(by.css('option:checked')).getText();
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

export class NinthUnitDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthUnit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthUnit'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
