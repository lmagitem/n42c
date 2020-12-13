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
  adminInput = element(by.id('field_admin'));
  shopRightsSelect = element(by.id('field_shopRights'));
  blogRightsSelect = element(by.id('field_blogRights'));
  profileRightsSelect = element(by.id('field_profileRights'));
  scriptoriumRightsSelect = element(by.id('field_scriptoriumRights'));
  imageUrlInput = element(by.id('field_imageUrl'));

  userSelect = element(by.id('field_user'));
  givenFriendshipsSelect = element(by.id('field_givenFriendships'));
  askedFriendRequestsSelect = element(by.id('field_askedFriendRequests'));

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

  getAdminInput(): ElementFinder {
    return this.adminInput;
  }

  async setShopRightsSelect(shopRights: string): Promise<void> {
    await this.shopRightsSelect.sendKeys(shopRights);
  }

  async getShopRightsSelect(): Promise<string> {
    return await this.shopRightsSelect.element(by.css('option:checked')).getText();
  }

  async shopRightsSelectLastOption(): Promise<void> {
    await this.shopRightsSelect.all(by.tagName('option')).last().click();
  }

  async setBlogRightsSelect(blogRights: string): Promise<void> {
    await this.blogRightsSelect.sendKeys(blogRights);
  }

  async getBlogRightsSelect(): Promise<string> {
    return await this.blogRightsSelect.element(by.css('option:checked')).getText();
  }

  async blogRightsSelectLastOption(): Promise<void> {
    await this.blogRightsSelect.all(by.tagName('option')).last().click();
  }

  async setProfileRightsSelect(profileRights: string): Promise<void> {
    await this.profileRightsSelect.sendKeys(profileRights);
  }

  async getProfileRightsSelect(): Promise<string> {
    return await this.profileRightsSelect.element(by.css('option:checked')).getText();
  }

  async profileRightsSelectLastOption(): Promise<void> {
    await this.profileRightsSelect.all(by.tagName('option')).last().click();
  }

  async setScriptoriumRightsSelect(scriptoriumRights: string): Promise<void> {
    await this.scriptoriumRightsSelect.sendKeys(scriptoriumRights);
  }

  async getScriptoriumRightsSelect(): Promise<string> {
    return await this.scriptoriumRightsSelect.element(by.css('option:checked')).getText();
  }

  async scriptoriumRightsSelectLastOption(): Promise<void> {
    await this.scriptoriumRightsSelect.all(by.tagName('option')).last().click();
  }

  async setImageUrlInput(imageUrl: string): Promise<void> {
    await this.imageUrlInput.sendKeys(imageUrl);
  }

  async getImageUrlInput(): Promise<string> {
    return await this.imageUrlInput.getAttribute('value');
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

  async givenFriendshipsSelectLastOption(): Promise<void> {
    await this.givenFriendshipsSelect.all(by.tagName('option')).last().click();
  }

  async givenFriendshipsSelectOption(option: string): Promise<void> {
    await this.givenFriendshipsSelect.sendKeys(option);
  }

  getGivenFriendshipsSelect(): ElementFinder {
    return this.givenFriendshipsSelect;
  }

  async getGivenFriendshipsSelectedOption(): Promise<string> {
    return await this.givenFriendshipsSelect.element(by.css('option:checked')).getText();
  }

  async askedFriendRequestsSelectLastOption(): Promise<void> {
    await this.askedFriendRequestsSelect.all(by.tagName('option')).last().click();
  }

  async askedFriendRequestsSelectOption(option: string): Promise<void> {
    await this.askedFriendRequestsSelect.sendKeys(option);
  }

  getAskedFriendRequestsSelect(): ElementFinder {
    return this.askedFriendRequestsSelect;
  }

  async getAskedFriendRequestsSelectedOption(): Promise<string> {
    return await this.askedFriendRequestsSelect.element(by.css('option:checked')).getText();
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
