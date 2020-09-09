import { element, by, ElementFinder } from 'protractor';

export class NinthMissionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-mission div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-mission div h2#page-heading span')).first();
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

export class NinthMissionUpdatePage {
  pageTitle = element(by.id('jhi-ninth-mission-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  gameTypeSelect = element(by.id('field_gameType'));
  gameSizeSelect = element(by.id('field_gameSize'));
  shareableInput = element(by.id('field_shareable'));

  missionStratagemsSelect = element(by.id('field_missionStratagems'));
  primaryObjectivesSelect = element(by.id('field_primaryObjectives'));
  allowedSecondariesSelect = element(by.id('field_allowedSecondaries'));
  rulesSelect = element(by.id('field_rules'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setGameTypeSelect(gameType: string): Promise<void> {
    await this.gameTypeSelect.sendKeys(gameType);
  }

  async getGameTypeSelect(): Promise<string> {
    return await this.gameTypeSelect.element(by.css('option:checked')).getText();
  }

  async gameTypeSelectLastOption(): Promise<void> {
    await this.gameTypeSelect.all(by.tagName('option')).last().click();
  }

  async setGameSizeSelect(gameSize: string): Promise<void> {
    await this.gameSizeSelect.sendKeys(gameSize);
  }

  async getGameSizeSelect(): Promise<string> {
    return await this.gameSizeSelect.element(by.css('option:checked')).getText();
  }

  async gameSizeSelectLastOption(): Promise<void> {
    await this.gameSizeSelect.all(by.tagName('option')).last().click();
  }

  getShareableInput(): ElementFinder {
    return this.shareableInput;
  }

  async missionStratagemsSelectLastOption(): Promise<void> {
    await this.missionStratagemsSelect.all(by.tagName('option')).last().click();
  }

  async missionStratagemsSelectOption(option: string): Promise<void> {
    await this.missionStratagemsSelect.sendKeys(option);
  }

  getMissionStratagemsSelect(): ElementFinder {
    return this.missionStratagemsSelect;
  }

  async getMissionStratagemsSelectedOption(): Promise<string> {
    return await this.missionStratagemsSelect.element(by.css('option:checked')).getText();
  }

  async primaryObjectivesSelectLastOption(): Promise<void> {
    await this.primaryObjectivesSelect.all(by.tagName('option')).last().click();
  }

  async primaryObjectivesSelectOption(option: string): Promise<void> {
    await this.primaryObjectivesSelect.sendKeys(option);
  }

  getPrimaryObjectivesSelect(): ElementFinder {
    return this.primaryObjectivesSelect;
  }

  async getPrimaryObjectivesSelectedOption(): Promise<string> {
    return await this.primaryObjectivesSelect.element(by.css('option:checked')).getText();
  }

  async allowedSecondariesSelectLastOption(): Promise<void> {
    await this.allowedSecondariesSelect.all(by.tagName('option')).last().click();
  }

  async allowedSecondariesSelectOption(option: string): Promise<void> {
    await this.allowedSecondariesSelect.sendKeys(option);
  }

  getAllowedSecondariesSelect(): ElementFinder {
    return this.allowedSecondariesSelect;
  }

  async getAllowedSecondariesSelectedOption(): Promise<string> {
    return await this.allowedSecondariesSelect.element(by.css('option:checked')).getText();
  }

  async rulesSelectLastOption(): Promise<void> {
    await this.rulesSelect.all(by.tagName('option')).last().click();
  }

  async rulesSelectOption(option: string): Promise<void> {
    await this.rulesSelect.sendKeys(option);
  }

  getRulesSelect(): ElementFinder {
    return this.rulesSelect;
  }

  async getRulesSelectedOption(): Promise<string> {
    return await this.rulesSelect.element(by.css('option:checked')).getText();
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

export class NinthMissionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthMission-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthMission'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
