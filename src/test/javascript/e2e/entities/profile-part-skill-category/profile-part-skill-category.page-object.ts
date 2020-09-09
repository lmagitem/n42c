import { element, by, ElementFinder } from 'protractor';

export class ProfilePartSkillCategoryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-profile-part-skill-category div table .btn-danger'));
  title = element.all(by.css('jhi-profile-part-skill-category div h2#page-heading span')).first();
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

export class ProfilePartSkillCategoryUpdatePage {
  pageTitle = element(by.id('jhi-profile-part-skill-category-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  indexInput = element(by.id('field_index'));

  profilePartSelect = element(by.id('field_profilePart'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setIndexInput(index: string): Promise<void> {
    await this.indexInput.sendKeys(index);
  }

  async getIndexInput(): Promise<string> {
    return await this.indexInput.getAttribute('value');
  }

  async profilePartSelectLastOption(): Promise<void> {
    await this.profilePartSelect.all(by.tagName('option')).last().click();
  }

  async profilePartSelectOption(option: string): Promise<void> {
    await this.profilePartSelect.sendKeys(option);
  }

  getProfilePartSelect(): ElementFinder {
    return this.profilePartSelect;
  }

  async getProfilePartSelectedOption(): Promise<string> {
    return await this.profilePartSelect.element(by.css('option:checked')).getText();
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

export class ProfilePartSkillCategoryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-profilePartSkillCategory-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-profilePartSkillCategory'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
