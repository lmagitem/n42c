import { element, by, ElementFinder } from 'protractor';

export class NinthArmyMomentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-army-moment div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-army-moment div h2#page-heading span')).first();
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

export class NinthArmyMomentUpdatePage {
  pageTitle = element(by.id('jhi-ninth-army-moment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  currentInput = element(by.id('field_current'));
  majorVictoriesInput = element(by.id('field_majorVictories'));
  minorVictoriesInput = element(by.id('field_minorVictories'));
  drawsInput = element(by.id('field_draws'));
  minorDefeatsInput = element(by.id('field_minorDefeats'));
  majorDefeatsInput = element(by.id('field_majorDefeats'));
  requisitionInput = element(by.id('field_requisition'));
  supplyLimitInput = element(by.id('field_supplyLimit'));
  supplyUsedInput = element(by.id('field_supplyUsed'));
  objectivesInput = element(by.id('field_objectives'));
  notesInput = element(by.id('field_notes'));

  selectedUnitsSelect = element(by.id('field_selectedUnits'));
  selectedObjectivesSelect = element(by.id('field_selectedObjectives'));
  battleSelect = element(by.id('field_battle'));
  armySelect = element(by.id('field_army'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getCurrentInput(): ElementFinder {
    return this.currentInput;
  }

  async setMajorVictoriesInput(majorVictories: string): Promise<void> {
    await this.majorVictoriesInput.sendKeys(majorVictories);
  }

  async getMajorVictoriesInput(): Promise<string> {
    return await this.majorVictoriesInput.getAttribute('value');
  }

  async setMinorVictoriesInput(minorVictories: string): Promise<void> {
    await this.minorVictoriesInput.sendKeys(minorVictories);
  }

  async getMinorVictoriesInput(): Promise<string> {
    return await this.minorVictoriesInput.getAttribute('value');
  }

  async setDrawsInput(draws: string): Promise<void> {
    await this.drawsInput.sendKeys(draws);
  }

  async getDrawsInput(): Promise<string> {
    return await this.drawsInput.getAttribute('value');
  }

  async setMinorDefeatsInput(minorDefeats: string): Promise<void> {
    await this.minorDefeatsInput.sendKeys(minorDefeats);
  }

  async getMinorDefeatsInput(): Promise<string> {
    return await this.minorDefeatsInput.getAttribute('value');
  }

  async setMajorDefeatsInput(majorDefeats: string): Promise<void> {
    await this.majorDefeatsInput.sendKeys(majorDefeats);
  }

  async getMajorDefeatsInput(): Promise<string> {
    return await this.majorDefeatsInput.getAttribute('value');
  }

  async setRequisitionInput(requisition: string): Promise<void> {
    await this.requisitionInput.sendKeys(requisition);
  }

  async getRequisitionInput(): Promise<string> {
    return await this.requisitionInput.getAttribute('value');
  }

  async setSupplyLimitInput(supplyLimit: string): Promise<void> {
    await this.supplyLimitInput.sendKeys(supplyLimit);
  }

  async getSupplyLimitInput(): Promise<string> {
    return await this.supplyLimitInput.getAttribute('value');
  }

  async setSupplyUsedInput(supplyUsed: string): Promise<void> {
    await this.supplyUsedInput.sendKeys(supplyUsed);
  }

  async getSupplyUsedInput(): Promise<string> {
    return await this.supplyUsedInput.getAttribute('value');
  }

  async setObjectivesInput(objectives: string): Promise<void> {
    await this.objectivesInput.sendKeys(objectives);
  }

  async getObjectivesInput(): Promise<string> {
    return await this.objectivesInput.getAttribute('value');
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
  }

  async selectedUnitsSelectLastOption(): Promise<void> {
    await this.selectedUnitsSelect.all(by.tagName('option')).last().click();
  }

  async selectedUnitsSelectOption(option: string): Promise<void> {
    await this.selectedUnitsSelect.sendKeys(option);
  }

  getSelectedUnitsSelect(): ElementFinder {
    return this.selectedUnitsSelect;
  }

  async getSelectedUnitsSelectedOption(): Promise<string> {
    return await this.selectedUnitsSelect.element(by.css('option:checked')).getText();
  }

  async selectedObjectivesSelectLastOption(): Promise<void> {
    await this.selectedObjectivesSelect.all(by.tagName('option')).last().click();
  }

  async selectedObjectivesSelectOption(option: string): Promise<void> {
    await this.selectedObjectivesSelect.sendKeys(option);
  }

  getSelectedObjectivesSelect(): ElementFinder {
    return this.selectedObjectivesSelect;
  }

  async getSelectedObjectivesSelectedOption(): Promise<string> {
    return await this.selectedObjectivesSelect.element(by.css('option:checked')).getText();
  }

  async battleSelectLastOption(): Promise<void> {
    await this.battleSelect.all(by.tagName('option')).last().click();
  }

  async battleSelectOption(option: string): Promise<void> {
    await this.battleSelect.sendKeys(option);
  }

  getBattleSelect(): ElementFinder {
    return this.battleSelect;
  }

  async getBattleSelectedOption(): Promise<string> {
    return await this.battleSelect.element(by.css('option:checked')).getText();
  }

  async armySelectLastOption(): Promise<void> {
    await this.armySelect.all(by.tagName('option')).last().click();
  }

  async armySelectOption(option: string): Promise<void> {
    await this.armySelect.sendKeys(option);
  }

  getArmySelect(): ElementFinder {
    return this.armySelect;
  }

  async getArmySelectedOption(): Promise<string> {
    return await this.armySelect.element(by.css('option:checked')).getText();
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

export class NinthArmyMomentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthArmyMoment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthArmyMoment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
