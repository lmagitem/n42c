import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LocalizedBlogCategoryComponentsPage,
  LocalizedBlogCategoryDeleteDialog,
  LocalizedBlogCategoryUpdatePage,
} from './localized-blog-category.page-object';

const expect = chai.expect;

describe('LocalizedBlogCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedBlogCategoryComponentsPage: LocalizedBlogCategoryComponentsPage;
  let localizedBlogCategoryUpdatePage: LocalizedBlogCategoryUpdatePage;
  let localizedBlogCategoryDeleteDialog: LocalizedBlogCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedBlogCategories', async () => {
    await navBarPage.goToEntity('localized-blog-category');
    localizedBlogCategoryComponentsPage = new LocalizedBlogCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(localizedBlogCategoryComponentsPage.title), 5000);
    expect(await localizedBlogCategoryComponentsPage.getTitle()).to.eq('n42cApp.localizedBlogCategory.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(localizedBlogCategoryComponentsPage.entities), ec.visibilityOf(localizedBlogCategoryComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LocalizedBlogCategory page', async () => {
    await localizedBlogCategoryComponentsPage.clickOnCreateButton();
    localizedBlogCategoryUpdatePage = new LocalizedBlogCategoryUpdatePage();
    expect(await localizedBlogCategoryUpdatePage.getPageTitle()).to.eq('n42cApp.localizedBlogCategory.home.createOrEditLabel');
    await localizedBlogCategoryUpdatePage.cancel();
  });

  it('should create and save LocalizedBlogCategories', async () => {
    const nbButtonsBeforeCreate = await localizedBlogCategoryComponentsPage.countDeleteButtons();

    await localizedBlogCategoryComponentsPage.clickOnCreateButton();

    await promise.all([
      localizedBlogCategoryUpdatePage.setNameInput('name'),
      localizedBlogCategoryUpdatePage.languageSelectLastOption(),
      localizedBlogCategoryUpdatePage.categorySelectLastOption(),
    ]);

    expect(await localizedBlogCategoryUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await localizedBlogCategoryUpdatePage.save();
    expect(await localizedBlogCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localizedBlogCategoryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LocalizedBlogCategory', async () => {
    const nbButtonsBeforeDelete = await localizedBlogCategoryComponentsPage.countDeleteButtons();
    await localizedBlogCategoryComponentsPage.clickOnLastDeleteButton();

    localizedBlogCategoryDeleteDialog = new LocalizedBlogCategoryDeleteDialog();
    expect(await localizedBlogCategoryDeleteDialog.getDialogTitle()).to.eq('n42cApp.localizedBlogCategory.delete.question');
    await localizedBlogCategoryDeleteDialog.clickOnConfirmButton();

    expect(await localizedBlogCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
