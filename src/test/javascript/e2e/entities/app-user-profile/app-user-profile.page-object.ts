import { element, by, ElementFinder } from 'protractor';

export class AppUserProfileComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-app-user-profile div table .btn-danger'));
  title = element.all(by.css('jhi-app-user-profile div h2#page-heading span')).first();
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

export class AppUserProfileUpdatePage {
  pageTitle = element(by.id('jhi-app-user-profile-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  titleInput = element(by.id('field_title'));
  summaryInput = element(by.id('field_summary'));
  headerBackgroundURIInput = element(by.id('field_headerBackgroundURI'));
  languageSelect = element(by.id('field_language'));

  profilesSelect = element(by.id('field_profiles'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setSummaryInput(summary: string): Promise<void> {
    await this.summaryInput.sendKeys(summary);
  }

  async getSummaryInput(): Promise<string> {
    return await this.summaryInput.getAttribute('value');
  }

  async setHeaderBackgroundURIInput(headerBackgroundURI: string): Promise<void> {
    await this.headerBackgroundURIInput.sendKeys(headerBackgroundURI);
  }

  async getHeaderBackgroundURIInput(): Promise<string> {
    return await this.headerBackgroundURIInput.getAttribute('value');
  }

  async setLanguageSelect(language: string): Promise<void> {
    await this.languageSelect.sendKeys(language);
  }

  async getLanguageSelect(): Promise<string> {
    return await this.languageSelect.element(by.css('option:checked')).getText();
  }

  async languageSelectLastOption(): Promise<void> {
    await this.languageSelect.all(by.tagName('option')).last().click();
  }

  async profilesSelectLastOption(): Promise<void> {
    await this.profilesSelect.all(by.tagName('option')).last().click();
  }

  async profilesSelectOption(option: string): Promise<void> {
    await this.profilesSelect.sendKeys(option);
  }

  getProfilesSelect(): ElementFinder {
    return this.profilesSelect;
  }

  async getProfilesSelectedOption(): Promise<string> {
    return await this.profilesSelect.element(by.css('option:checked')).getText();
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

export class AppUserProfileDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appUserProfile-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appUserProfile'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
