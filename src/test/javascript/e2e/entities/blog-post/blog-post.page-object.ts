import { element, by, ElementFinder } from 'protractor';

export class BlogPostComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-blog-post div table .btn-danger'));
  title = element.all(by.css('jhi-blog-post div h2#page-heading span')).first();
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

export class BlogPostUpdatePage {
  pageTitle = element(by.id('jhi-blog-post-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  publishedInput = element(by.id('field_published'));
  modifiedInput = element(by.id('field_modified'));
  pictureUrlInput = element(by.id('field_pictureUrl'));

  authorsSelect = element(by.id('field_authors'));
  categoriesSelect = element(by.id('field_categories'));
  blogSelect = element(by.id('field_blog'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setPublishedInput(published: string): Promise<void> {
    await this.publishedInput.sendKeys(published);
  }

  async getPublishedInput(): Promise<string> {
    return await this.publishedInput.getAttribute('value');
  }

  async setModifiedInput(modified: string): Promise<void> {
    await this.modifiedInput.sendKeys(modified);
  }

  async getModifiedInput(): Promise<string> {
    return await this.modifiedInput.getAttribute('value');
  }

  async setPictureUrlInput(pictureUrl: string): Promise<void> {
    await this.pictureUrlInput.sendKeys(pictureUrl);
  }

  async getPictureUrlInput(): Promise<string> {
    return await this.pictureUrlInput.getAttribute('value');
  }

  async authorsSelectLastOption(): Promise<void> {
    await this.authorsSelect.all(by.tagName('option')).last().click();
  }

  async authorsSelectOption(option: string): Promise<void> {
    await this.authorsSelect.sendKeys(option);
  }

  getAuthorsSelect(): ElementFinder {
    return this.authorsSelect;
  }

  async getAuthorsSelectedOption(): Promise<string> {
    return await this.authorsSelect.element(by.css('option:checked')).getText();
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

  async blogSelectLastOption(): Promise<void> {
    await this.blogSelect.all(by.tagName('option')).last().click();
  }

  async blogSelectOption(option: string): Promise<void> {
    await this.blogSelect.sendKeys(option);
  }

  getBlogSelect(): ElementFinder {
    return this.blogSelect;
  }

  async getBlogSelectedOption(): Promise<string> {
    return await this.blogSelect.element(by.css('option:checked')).getText();
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

export class BlogPostDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-blogPost-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-blogPost'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
