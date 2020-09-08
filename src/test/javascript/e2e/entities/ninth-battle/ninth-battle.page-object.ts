import { element, by, ElementFinder } from 'protractor';

export class NinthBattleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-battle div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-battle div h2#page-heading span')).first();
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

export class NinthBattleUpdatePage {
  pageTitle = element(by.id('jhi-ninth-battle-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));

  campaignMomentSelect = element(by.id('field_campaignMoment'));
  missionSelect = element(by.id('field_mission'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async campaignMomentSelectLastOption(): Promise<void> {
    await this.campaignMomentSelect.all(by.tagName('option')).last().click();
  }

  async campaignMomentSelectOption(option: string): Promise<void> {
    await this.campaignMomentSelect.sendKeys(option);
  }

  getCampaignMomentSelect(): ElementFinder {
    return this.campaignMomentSelect;
  }

  async getCampaignMomentSelectedOption(): Promise<string> {
    return await this.campaignMomentSelect.element(by.css('option:checked')).getText();
  }

  async missionSelectLastOption(): Promise<void> {
    await this.missionSelect.all(by.tagName('option')).last().click();
  }

  async missionSelectOption(option: string): Promise<void> {
    await this.missionSelect.sendKeys(option);
  }

  getMissionSelect(): ElementFinder {
    return this.missionSelect;
  }

  async getMissionSelectedOption(): Promise<string> {
    return await this.missionSelect.element(by.css('option:checked')).getText();
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

export class NinthBattleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthBattle-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthBattle'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
