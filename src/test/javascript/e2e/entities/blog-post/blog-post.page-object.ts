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

  publishedInput = element(by.id('field_published'));
  excerptInput = element(by.id('field_excerpt'));
  contentInput = element(by.id('field_content'));
  languageSelect = element(by.id('field_language'));

  authorSelect = element(by.id('field_author'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPublishedInput(published: string): Promise<void> {
    await this.publishedInput.sendKeys(published);
  }

  async getPublishedInput(): Promise<string> {
    return await this.publishedInput.getAttribute('value');
  }

  async setExcerptInput(excerpt: string): Promise<void> {
    await this.excerptInput.sendKeys(excerpt);
  }

  async getExcerptInput(): Promise<string> {
    return await this.excerptInput.getAttribute('value');
  }

  async setContentInput(content: string): Promise<void> {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput(): Promise<string> {
    return await this.contentInput.getAttribute('value');
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

  async authorSelectLastOption(): Promise<void> {
    await this.authorSelect.all(by.tagName('option')).last().click();
  }

  async authorSelectOption(option: string): Promise<void> {
    await this.authorSelect.sendKeys(option);
  }

  getAuthorSelect(): ElementFinder {
    return this.authorSelect;
  }

  async getAuthorSelectedOption(): Promise<string> {
    return await this.authorSelect.element(by.css('option:checked')).getText();
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
