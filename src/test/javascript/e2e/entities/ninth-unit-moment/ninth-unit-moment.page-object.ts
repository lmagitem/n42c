import { element, by, ElementFinder } from 'protractor';

export class NinthUnitMomentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-unit-moment div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-unit-moment div h2#page-heading span')).first();
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

export class NinthUnitMomentUpdatePage {
  pageTitle = element(by.id('jhi-ninth-unit-moment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  currentInput = element(by.id('field_current'));
  sinceInstantInput = element(by.id('field_sinceInstant'));
  pictureUrlInput = element(by.id('field_pictureUrl'));

  unitSelect = element(by.id('field_unit'));

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

  async setPictureUrlInput(pictureUrl: string): Promise<void> {
    await this.pictureUrlInput.sendKeys(pictureUrl);
  }

  async getPictureUrlInput(): Promise<string> {
    return await this.pictureUrlInput.getAttribute('value');
  }

  async unitSelectLastOption(): Promise<void> {
    await this.unitSelect.all(by.tagName('option')).last().click();
  }

  async unitSelectOption(option: string): Promise<void> {
    await this.unitSelect.sendKeys(option);
  }

  getUnitSelect(): ElementFinder {
    return this.unitSelect;
  }

  async getUnitSelectedOption(): Promise<string> {
    return await this.unitSelect.element(by.css('option:checked')).getText();
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

export class NinthUnitMomentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthUnitMoment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthUnitMoment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
