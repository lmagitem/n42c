import { element, by, ElementFinder } from 'protractor';

export class NinthStratagemComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-stratagem div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-stratagem div h2#page-heading span')).first();
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

export class NinthStratagemUpdatePage {
  pageTitle = element(by.id('jhi-ninth-stratagem-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  costInput = element(by.id('field_cost'));
  factionSelect = element(by.id('field_faction'));
  subfactionSelect = element(by.id('field_subfaction'));
  turnSelect = element(by.id('field_turn'));
  phaseSelect = element(by.id('field_phase'));

  groupSelect = element(by.id('field_group'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCostInput(cost: string): Promise<void> {
    await this.costInput.sendKeys(cost);
  }

  async getCostInput(): Promise<string> {
    return await this.costInput.getAttribute('value');
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

  async setTurnSelect(turn: string): Promise<void> {
    await this.turnSelect.sendKeys(turn);
  }

  async getTurnSelect(): Promise<string> {
    return await this.turnSelect.element(by.css('option:checked')).getText();
  }

  async turnSelectLastOption(): Promise<void> {
    await this.turnSelect.all(by.tagName('option')).last().click();
  }

  async setPhaseSelect(phase: string): Promise<void> {
    await this.phaseSelect.sendKeys(phase);
  }

  async getPhaseSelect(): Promise<string> {
    return await this.phaseSelect.element(by.css('option:checked')).getText();
  }

  async phaseSelectLastOption(): Promise<void> {
    await this.phaseSelect.all(by.tagName('option')).last().click();
  }

  async groupSelectLastOption(): Promise<void> {
    await this.groupSelect.all(by.tagName('option')).last().click();
  }

  async groupSelectOption(option: string): Promise<void> {
    await this.groupSelect.sendKeys(option);
  }

  getGroupSelect(): ElementFinder {
    return this.groupSelect;
  }

  async getGroupSelectedOption(): Promise<string> {
    return await this.groupSelect.element(by.css('option:checked')).getText();
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

export class NinthStratagemDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthStratagem-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthStratagem'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
