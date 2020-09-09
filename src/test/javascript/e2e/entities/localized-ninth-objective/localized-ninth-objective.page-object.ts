import { element, by, ElementFinder } from 'protractor';

export class LocalizedNinthObjectiveComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-localized-ninth-objective div table .btn-danger'));
  title = element.all(by.css('jhi-localized-ninth-objective div h2#page-heading span')).first();
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

export class LocalizedNinthObjectiveUpdatePage {
  pageTitle = element(by.id('jhi-localized-ninth-objective-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));

  objectiveSelect = element(by.id('field_objective'));

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

  async objectiveSelectLastOption(): Promise<void> {
    await this.objectiveSelect.all(by.tagName('option')).last().click();
  }

  async objectiveSelectOption(option: string): Promise<void> {
    await this.objectiveSelect.sendKeys(option);
  }

  getObjectiveSelect(): ElementFinder {
    return this.objectiveSelect;
  }

  async getObjectiveSelectedOption(): Promise<string> {
    return await this.objectiveSelect.element(by.css('option:checked')).getText();
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

export class LocalizedNinthObjectiveDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-localizedNinthObjective-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-localizedNinthObjective'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
