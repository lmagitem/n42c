import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BlogCategoryComponentsPage, BlogCategoryDeleteDialog, BlogCategoryUpdatePage } from './blog-category.page-object';

const expect = chai.expect;

describe('BlogCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let blogCategoryComponentsPage: BlogCategoryComponentsPage;
  let blogCategoryUpdatePage: BlogCategoryUpdatePage;
  let blogCategoryDeleteDialog: BlogCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BlogCategories', async () => {
    await navBarPage.goToEntity('blog-category');
    blogCategoryComponentsPage = new BlogCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(blogCategoryComponentsPage.title), 5000);
    expect(await blogCategoryComponentsPage.getTitle()).to.eq('n42cApp.blogCategory.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(blogCategoryComponentsPage.entities), ec.visibilityOf(blogCategoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create BlogCategory page', async () => {
    await blogCategoryComponentsPage.clickOnCreateButton();
    blogCategoryUpdatePage = new BlogCategoryUpdatePage();
    expect(await blogCategoryUpdatePage.getPageTitle()).to.eq('n42cApp.blogCategory.home.createOrEditLabel');
    await blogCategoryUpdatePage.cancel();
  });

  it('should create and save BlogCategories', async () => {
    const nbButtonsBeforeCreate = await blogCategoryComponentsPage.countDeleteButtons();

    await blogCategoryComponentsPage.clickOnCreateButton();

    await promise.all([
      blogCategoryUpdatePage.setNameInput('name'),
      blogCategoryUpdatePage.languageSelectLastOption(),
      blogCategoryUpdatePage.categoriesSelectLastOption(),
      blogCategoryUpdatePage.subcategoriesSelectLastOption(),
    ]);

    expect(await blogCategoryUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await blogCategoryUpdatePage.save();
    expect(await blogCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await blogCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last BlogCategory', async () => {
    const nbButtonsBeforeDelete = await blogCategoryComponentsPage.countDeleteButtons();
    await blogCategoryComponentsPage.clickOnLastDeleteButton();

    blogCategoryDeleteDialog = new BlogCategoryDeleteDialog();
    expect(await blogCategoryDeleteDialog.getDialogTitle()).to.eq('n42cApp.blogCategory.delete.question');
    await blogCategoryDeleteDialog.clickOnConfirmButton();

    expect(await blogCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
