import { element, by, ElementFinder } from 'protractor';

export class LocalizedNinthMissionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-localized-ninth-mission div table .btn-danger'));
  title = element.all(by.css('jhi-localized-ninth-mission div h2#page-heading span')).first();
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

export class LocalizedNinthMissionUpdatePage {
  pageTitle = element(by.id('jhi-localized-ninth-mission-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  briefingInput = element(by.id('field_briefing'));
  languageSelect = element(by.id('field_language'));

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

  async setBriefingInput(briefing: string): Promise<void> {
    await this.briefingInput.sendKeys(briefing);
  }

  async getBriefingInput(): Promise<string> {
    return await this.briefingInput.getAttribute('value');
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

export class LocalizedNinthMissionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-localizedNinthMission-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-localizedNinthMission'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
