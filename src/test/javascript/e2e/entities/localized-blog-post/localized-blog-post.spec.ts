import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LocalizedBlogPostComponentsPage,
  /* LocalizedBlogPostDeleteDialog, */
  LocalizedBlogPostUpdatePage,
} from './localized-blog-post.page-object';

const expect = chai.expect;

describe('LocalizedBlogPost e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedBlogPostComponentsPage: LocalizedBlogPostComponentsPage;
  let localizedBlogPostUpdatePage: LocalizedBlogPostUpdatePage;
  /* let localizedBlogPostDeleteDialog: LocalizedBlogPostDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedBlogPosts', async () => {
    await navBarPage.goToEntity('localized-blog-post');
    localizedBlogPostComponentsPage = new LocalizedBlogPostComponentsPage();
    await browser.wait(ec.visibilityOf(localizedBlogPostComponentsPage.title), 5000);
    expect(await localizedBlogPostComponentsPage.getTitle()).to.eq('n42cApp.localizedBlogPost.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(localizedBlogPostComponentsPage.entities), ec.visibilityOf(localizedBlogPostComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LocalizedBlogPost page', async () => {
    await localizedBlogPostComponentsPage.clickOnCreateButton();
    localizedBlogPostUpdatePage = new LocalizedBlogPostUpdatePage();
    expect(await localizedBlogPostUpdatePage.getPageTitle()).to.eq('n42cApp.localizedBlogPost.home.createOrEditLabel');
    await localizedBlogPostUpdatePage.cancel();
  });

  /* it('should create and save LocalizedBlogPosts', async () => {
        const nbButtonsBeforeCreate = await localizedBlogPostComponentsPage.countDeleteButtons();

        await localizedBlogPostComponentsPage.clickOnCreateButton();

        await promise.all([
            localizedBlogPostUpdatePage.setTitleInput('title'),
            localizedBlogPostUpdatePage.setExcerptInput('excerpt'),
            localizedBlogPostUpdatePage.setContentInput('content'),
            localizedBlogPostUpdatePage.languageSelectLastOption(),
            localizedBlogPostUpdatePage.postSelectLastOption(),
        ]);

        expect(await localizedBlogPostUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
        expect(await localizedBlogPostUpdatePage.getExcerptInput()).to.eq('excerpt', 'Expected Excerpt value to be equals to excerpt');
        expect(await localizedBlogPostUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');

        await localizedBlogPostUpdatePage.save();
        expect(await localizedBlogPostUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await localizedBlogPostComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last LocalizedBlogPost', async () => {
        const nbButtonsBeforeDelete = await localizedBlogPostComponentsPage.countDeleteButtons();
        await localizedBlogPostComponentsPage.clickOnLastDeleteButton();

        localizedBlogPostDeleteDialog = new LocalizedBlogPostDeleteDialog();
        expect(await localizedBlogPostDeleteDialog.getDialogTitle())
            .to.eq('n42cApp.localizedBlogPost.delete.question');
        await localizedBlogPostDeleteDialog.clickOnConfirmButton();

        expect(await localizedBlogPostComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
