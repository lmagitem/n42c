import { element, by, ElementFinder } from 'protractor';

export class LocalizedNinthDeploymentMapComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-localized-ninth-deployment-map div table .btn-danger'));
  title = element.all(by.css('jhi-localized-ninth-deployment-map div h2#page-heading span')).first();
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

export class LocalizedNinthDeploymentMapUpdatePage {
  pageTitle = element(by.id('jhi-localized-ninth-deployment-map-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));

  deploymentMapSelect = element(by.id('field_deploymentMap'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async deploymentMapSelectLastOption(): Promise<void> {
    await this.deploymentMapSelect.all(by.tagName('option')).last().click();
  }

  async deploymentMapSelectOption(option: string): Promise<void> {
    await this.deploymentMapSelect.sendKeys(option);
  }

  getDeploymentMapSelect(): ElementFinder {
    return this.deploymentMapSelect;
  }

  async getDeploymentMapSelectedOption(): Promise<string> {
    return await this.deploymentMapSelect.element(by.css('option:checked')).getText();
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

export class LocalizedNinthDeploymentMapDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-localizedNinthDeploymentMap-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-localizedNinthDeploymentMap'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
