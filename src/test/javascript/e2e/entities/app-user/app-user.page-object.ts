import { element, by, ElementFinder } from 'protractor';

export class AppUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-app-user div table .btn-danger'));
  title = element.all(by.css('jhi-app-user div h2#page-heading span')).first();
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

export class AppUserUpdatePage {
  pageTitle = element(by.id('jhi-app-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  userNameInput = element(by.id('field_userName'));
  displayedNameInput = element(by.id('field_displayedName'));
  emailInput = element(by.id('field_email'));
  adminInput = element(by.id('field_admin'));
  rightsSelect = element(by.id('field_rights'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUserNameInput(userName: string): Promise<void> {
    await this.userNameInput.sendKeys(userName);
  }

  async getUserNameInput(): Promise<string> {
    return await this.userNameInput.getAttribute('value');
  }

  async setDisplayedNameInput(displayedName: string): Promise<void> {
    await this.displayedNameInput.sendKeys(displayedName);
  }

  async getDisplayedNameInput(): Promise<string> {
    return await this.displayedNameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  getAdminInput(): ElementFinder {
    return this.adminInput;
  }

  async setRightsSelect(rights: string): Promise<void> {
    await this.rightsSelect.sendKeys(rights);
  }

  async getRightsSelect(): Promise<string> {
    return await this.rightsSelect.element(by.css('option:checked')).getText();
  }

  async rightsSelectLastOption(): Promise<void> {
    await this.rightsSelect.all(by.tagName('option')).last().click();
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class AppUserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appUser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appUser'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
