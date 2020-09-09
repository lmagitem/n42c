import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LocalizedPostContentComponentsPage,
  LocalizedPostContentDeleteDialog,
  LocalizedPostContentUpdatePage,
} from './localized-post-content.page-object';

const expect = chai.expect;

describe('LocalizedPostContent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedPostContentComponentsPage: LocalizedPostContentComponentsPage;
  let localizedPostContentUpdatePage: LocalizedPostContentUpdatePage;
  let localizedPostContentDeleteDialog: LocalizedPostContentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedPostContents', async () => {
    await navBarPage.goToEntity('localized-post-content');
    localizedPostContentComponentsPage = new LocalizedPostContentComponentsPage();
    await browser.wait(ec.visibilityOf(localizedPostContentComponentsPage.title), 5000);
    expect(await localizedPostContentComponentsPage.getTitle()).to.eq('n42CApp.localizedPostContent.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(localizedPostContentComponentsPage.entities), ec.visibilityOf(localizedPostContentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LocalizedPostContent page', async () => {
    await localizedPostContentComponentsPage.clickOnCreateButton();
    localizedPostContentUpdatePage = new LocalizedPostContentUpdatePage();
    expect(await localizedPostContentUpdatePage.getPageTitle()).to.eq('n42CApp.localizedPostContent.home.createOrEditLabel');
    await localizedPostContentUpdatePage.cancel();
  });

  it('should create and save LocalizedPostContents', async () => {
    const nbButtonsBeforeCreate = await localizedPostContentComponentsPage.countDeleteButtons();

    await localizedPostContentComponentsPage.clickOnCreateButton();

    await promise.all([
      localizedPostContentUpdatePage.setExcerptInput('excerpt'),
      localizedPostContentUpdatePage.setContentInput('content'),
      localizedPostContentUpdatePage.languageSelectLastOption(),
      localizedPostContentUpdatePage.postSelectLastOption(),
    ]);

    expect(await localizedPostContentUpdatePage.getExcerptInput()).to.eq('excerpt', 'Expected Excerpt value to be equals to excerpt');
    expect(await localizedPostContentUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');

    await localizedPostContentUpdatePage.save();
    expect(await localizedPostContentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localizedPostContentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LocalizedPostContent', async () => {
    const nbButtonsBeforeDelete = await localizedPostContentComponentsPage.countDeleteButtons();
    await localizedPostContentComponentsPage.clickOnLastDeleteButton();

    localizedPostContentDeleteDialog = new LocalizedPostContentDeleteDialog();
    expect(await localizedPostContentDeleteDialog.getDialogTitle()).to.eq('n42CApp.localizedPostContent.delete.question');
    await localizedPostContentDeleteDialog.clickOnConfirmButton();

    expect(await localizedPostContentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
