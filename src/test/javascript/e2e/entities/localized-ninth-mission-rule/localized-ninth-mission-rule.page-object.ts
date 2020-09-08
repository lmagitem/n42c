import { element, by, ElementFinder } from 'protractor';

export class LocalizedNinthMissionRuleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-localized-ninth-mission-rule div table .btn-danger'));
  title = element.all(by.css('jhi-localized-ninth-mission-rule div h2#page-heading span')).first();
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

export class LocalizedNinthMissionRuleUpdatePage {
  pageTitle = element(by.id('jhi-localized-ninth-mission-rule-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));

  ruleSelect = element(by.id('field_rule'));

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

  async ruleSelectLastOption(): Promise<void> {
    await this.ruleSelect.all(by.tagName('option')).last().click();
  }

  async ruleSelectOption(option: string): Promise<void> {
    await this.ruleSelect.sendKeys(option);
  }

  getRuleSelect(): ElementFinder {
    return this.ruleSelect;
  }

  async getRuleSelectedOption(): Promise<string> {
    return await this.ruleSelect.element(by.css('option:checked')).getText();
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

export class LocalizedNinthMissionRuleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-localizedNinthMissionRule-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-localizedNinthMissionRule'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}