import { element, by, ElementFinder } from 'protractor';

export class NinthArmyUnitComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-army-unit div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-army-unit div h2#page-heading span')).first();
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

export class NinthArmyUnitUpdatePage {
  pageTitle = element(by.id('jhi-ninth-army-unit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  selectableKeywordsInput = element(by.id('field_selectableKeywords'));

  armySelect = element(by.id('field_army'));
  unitSelect = element(by.id('field_unit'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSelectableKeywordsInput(selectableKeywords: string): Promise<void> {
    await this.selectableKeywordsInput.sendKeys(selectableKeywords);
  }

  async getSelectableKeywordsInput(): Promise<string> {
    return await this.selectableKeywordsInput.getAttribute('value');
  }

  async armySelectLastOption(): Promise<void> {
    await this.armySelect.all(by.tagName('option')).last().click();
  }

  async armySelectOption(option: string): Promise<void> {
    await this.armySelect.sendKeys(option);
  }

  getArmySelect(): ElementFinder {
    return this.armySelect;
  }

  async getArmySelectedOption(): Promise<string> {
    return await this.armySelect.element(by.css('option:checked')).getText();
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

export class NinthArmyUnitDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthArmyUnit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthArmyUnit'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
