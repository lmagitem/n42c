import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LocalizedBlogComponentsPage, LocalizedBlogDeleteDialog, LocalizedBlogUpdatePage } from './localized-blog.page-object';

const expect = chai.expect;

describe('LocalizedBlog e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedBlogComponentsPage: LocalizedBlogComponentsPage;
  let localizedBlogUpdatePage: LocalizedBlogUpdatePage;
  let localizedBlogDeleteDialog: LocalizedBlogDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedBlogs', async () => {
    await navBarPage.goToEntity('localized-blog');
    localizedBlogComponentsPage = new LocalizedBlogComponentsPage();
    await browser.wait(ec.visibilityOf(localizedBlogComponentsPage.title), 5000);
    expect(await localizedBlogComponentsPage.getTitle()).to.eq('n42cApp.localizedBlog.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(localizedBlogComponentsPage.entities), ec.visibilityOf(localizedBlogComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LocalizedBlog page', async () => {
    await localizedBlogComponentsPage.clickOnCreateButton();
    localizedBlogUpdatePage = new LocalizedBlogUpdatePage();
    expect(await localizedBlogUpdatePage.getPageTitle()).to.eq('n42cApp.localizedBlog.home.createOrEditLabel');
    await localizedBlogUpdatePage.cancel();
  });

  it('should create and save LocalizedBlogs', async () => {
    const nbButtonsBeforeCreate = await localizedBlogComponentsPage.countDeleteButtons();

    await localizedBlogComponentsPage.clickOnCreateButton();

    await promise.all([
      localizedBlogUpdatePage.setNameInput('name'),
      localizedBlogUpdatePage.languageSelectLastOption(),
      localizedBlogUpdatePage.blogSelectLastOption(),
    ]);

    expect(await localizedBlogUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await localizedBlogUpdatePage.save();
    expect(await localizedBlogUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localizedBlogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last LocalizedBlog', async () => {
    const nbButtonsBeforeDelete = await localizedBlogComponentsPage.countDeleteButtons();
    await localizedBlogComponentsPage.clickOnLastDeleteButton();

    localizedBlogDeleteDialog = new LocalizedBlogDeleteDialog();
    expect(await localizedBlogDeleteDialog.getDialogTitle()).to.eq('n42cApp.localizedBlog.delete.question');
    await localizedBlogDeleteDialog.clickOnConfirmButton();

    expect(await localizedBlogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
