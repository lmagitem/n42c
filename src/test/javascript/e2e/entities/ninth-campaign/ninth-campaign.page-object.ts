import { element, by, ElementFinder } from 'protractor';

export class NinthCampaignComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-campaign div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-campaign div h2#page-heading span')).first();
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

export class NinthCampaignUpdatePage {
  pageTitle = element(by.id('jhi-ninth-campaign-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  gameTypeSelect = element(by.id('field_gameType'));
  usePowerRatingInput = element(by.id('field_usePowerRating'));
  descriptionInput = element(by.id('field_description'));

  authorsSelect = element(by.id('field_authors'));
  participantsSelect = element(by.id('field_participants'));
  campaignStratagemsSelect = element(by.id('field_campaignStratagems'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
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

  getUsePowerRatingInput(): ElementFinder {
    return this.usePowerRatingInput;
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async authorsSelectLastOption(): Promise<void> {
    await this.authorsSelect.all(by.tagName('option')).last().click();
  }

  async authorsSelectOption(option: string): Promise<void> {
    await this.authorsSelect.sendKeys(option);
  }

  getAuthorsSelect(): ElementFinder {
    return this.authorsSelect;
  }

  async getAuthorsSelectedOption(): Promise<string> {
    return await this.authorsSelect.element(by.css('option:checked')).getText();
  }

  async participantsSelectLastOption(): Promise<void> {
    await this.participantsSelect.all(by.tagName('option')).last().click();
  }

  async participantsSelectOption(option: string): Promise<void> {
    await this.participantsSelect.sendKeys(option);
  }

  getParticipantsSelect(): ElementFinder {
    return this.participantsSelect;
  }

  async getParticipantsSelectedOption(): Promise<string> {
    return await this.participantsSelect.element(by.css('option:checked')).getText();
  }

  async campaignStratagemsSelectLastOption(): Promise<void> {
    await this.campaignStratagemsSelect.all(by.tagName('option')).last().click();
  }

  async campaignStratagemsSelectOption(option: string): Promise<void> {
    await this.campaignStratagemsSelect.sendKeys(option);
  }

  getCampaignStratagemsSelect(): ElementFinder {
    return this.campaignStratagemsSelect;
  }

  async getCampaignStratagemsSelectedOption(): Promise<string> {
    return await this.campaignStratagemsSelect.element(by.css('option:checked')).getText();
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

export class NinthCampaignDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthCampaign-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthCampaign'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
