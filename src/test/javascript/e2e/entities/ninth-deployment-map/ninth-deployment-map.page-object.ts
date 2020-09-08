import { element, by, ElementFinder } from 'protractor';

export class NinthDeploymentMapComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-deployment-map div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-deployment-map div h2#page-heading span')).first();
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

export class NinthDeploymentMapUpdatePage {
  pageTitle = element(by.id('jhi-ninth-deployment-map-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  urlInput = element(by.id('field_url'));
  shareableInput = element(by.id('field_shareable'));

  usedInMissionsSelect = element(by.id('field_usedInMissions'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUrlInput(url: string): Promise<void> {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput(): Promise<string> {
    return await this.urlInput.getAttribute('value');
  }

  getShareableInput(): ElementFinder {
    return this.shareableInput;
  }

  async usedInMissionsSelectLastOption(): Promise<void> {
    await this.usedInMissionsSelect.all(by.tagName('option')).last().click();
  }

  async usedInMissionsSelectOption(option: string): Promise<void> {
    await this.usedInMissionsSelect.sendKeys(option);
  }

  getUsedInMissionsSelect(): ElementFinder {
    return this.usedInMissionsSelect;
  }

  async getUsedInMissionsSelectedOption(): Promise<string> {
    return await this.usedInMissionsSelect.element(by.css('option:checked')).getText();
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

export class NinthDeploymentMapDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthDeploymentMap-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthDeploymentMap'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
