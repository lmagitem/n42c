import { element, by, ElementFinder } from 'protractor';

export class ProfilePartSkillComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-profile-part-skill div table .btn-danger'));
  title = element.all(by.css('jhi-profile-part-skill div h2#page-heading span')).first();
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

export class ProfilePartSkillUpdatePage {
  pageTitle = element(by.id('jhi-profile-part-skill-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  indexInput = element(by.id('field_index'));
  levelSelect = element(by.id('field_level'));

  linkedSkillsSelect = element(by.id('field_linkedSkills'));
  skillsSelect = element(by.id('field_skills'));

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

  async setLevelSelect(level: string): Promise<void> {
    await this.levelSelect.sendKeys(level);
  }

  async getLevelSelect(): Promise<string> {
    return await this.levelSelect.element(by.css('option:checked')).getText();
  }

  async levelSelectLastOption(): Promise<void> {
    await this.levelSelect.all(by.tagName('option')).last().click();
  }

  async linkedSkillsSelectLastOption(): Promise<void> {
    await this.linkedSkillsSelect.all(by.tagName('option')).last().click();
  }

  async linkedSkillsSelectOption(option: string): Promise<void> {
    await this.linkedSkillsSelect.sendKeys(option);
  }

  getLinkedSkillsSelect(): ElementFinder {
    return this.linkedSkillsSelect;
  }

  async getLinkedSkillsSelectedOption(): Promise<string> {
    return await this.linkedSkillsSelect.element(by.css('option:checked')).getText();
  }

  async skillsSelectLastOption(): Promise<void> {
    await this.skillsSelect.all(by.tagName('option')).last().click();
  }

  async skillsSelectOption(option: string): Promise<void> {
    await this.skillsSelect.sendKeys(option);
  }

  getSkillsSelect(): ElementFinder {
    return this.skillsSelect;
  }

  async getSkillsSelectedOption(): Promise<string> {
    return await this.skillsSelect.element(by.css('option:checked')).getText();
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

export class ProfilePartSkillDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-profilePartSkill-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-profilePartSkill'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
