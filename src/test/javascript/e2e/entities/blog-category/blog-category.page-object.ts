import { element, by, ElementFinder } from 'protractor';

export class BlogCategoryComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-blog-category div table .btn-danger'));
  title = element.all(by.css('jhi-blog-category div h2#page-heading span')).first();
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

export class BlogCategoryUpdatePage {
  pageTitle = element(by.id('jhi-blog-category-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  languageSelect = element(by.id('field_language'));

  categoriesSelect = element(by.id('field_categories'));
  subcategoriesSelect = element(by.id('field_subcategories'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
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

  async categoriesSelectLastOption(): Promise<void> {
    await this.categoriesSelect.all(by.tagName('option')).last().click();
  }

  async categoriesSelectOption(option: string): Promise<void> {
    await this.categoriesSelect.sendKeys(option);
  }

  getCategoriesSelect(): ElementFinder {
    return this.categoriesSelect;
  }

  async getCategoriesSelectedOption(): Promise<string> {
    return await this.categoriesSelect.element(by.css('option:checked')).getText();
  }

  async subcategoriesSelectLastOption(): Promise<void> {
    await this.subcategoriesSelect.all(by.tagName('option')).last().click();
  }

  async subcategoriesSelectOption(option: string): Promise<void> {
    await this.subcategoriesSelect.sendKeys(option);
  }

  getSubcategoriesSelect(): ElementFinder {
    return this.subcategoriesSelect;
  }

  async getSubcategoriesSelectedOption(): Promise<string> {
    return await this.subcategoriesSelect.element(by.css('option:checked')).getText();
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

export class BlogCategoryDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-blogCategory-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-blogCategory'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
