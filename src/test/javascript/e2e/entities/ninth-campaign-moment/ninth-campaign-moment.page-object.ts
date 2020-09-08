import { element, by, ElementFinder } from 'protractor';

export class NinthCampaignMomentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-campaign-moment div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-campaign-moment div h2#page-heading span')).first();
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

export class NinthCampaignMomentUpdatePage {
  pageTitle = element(by.id('jhi-ninth-campaign-moment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  currentInput = element(by.id('field_current'));
  sinceInstantInput = element(by.id('field_sinceInstant'));
  nameInput = element(by.id('field_name'));
  summaryInput = element(by.id('field_summary'));
  descriptionInput = element(by.id('field_description'));

  campaignSelect = element(by.id('field_campaign'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getCurrentInput(): ElementFinder {
    return this.currentInput;
  }

  async setSinceInstantInput(sinceInstant: string): Promise<void> {
    await this.sinceInstantInput.sendKeys(sinceInstant);
  }

  async getSinceInstantInput(): Promise<string> {
    return await this.sinceInstantInput.getAttribute('value');
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

  async campaignSelectLastOption(): Promise<void> {
    await this.campaignSelect.all(by.tagName('option')).last().click();
  }

  async campaignSelectOption(option: string): Promise<void> {
    await this.campaignSelect.sendKeys(option);
  }

  getCampaignSelect(): ElementFinder {
    return this.campaignSelect;
  }

  async getCampaignSelectedOption(): Promise<string> {
    return await this.campaignSelect.element(by.css('option:checked')).getText();
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

export class NinthCampaignMomentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthCampaignMoment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthCampaignMoment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
