import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BlogPostComponentsPage, BlogPostDeleteDialog, BlogPostUpdatePage } from './blog-post.page-object';

const expect = chai.expect;

describe('BlogPost e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let blogPostComponentsPage: BlogPostComponentsPage;
  let blogPostUpdatePage: BlogPostUpdatePage;
  let blogPostDeleteDialog: BlogPostDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BlogPosts', async () => {
    await navBarPage.goToEntity('blog-post');
    blogPostComponentsPage = new BlogPostComponentsPage();
    await browser.wait(ec.visibilityOf(blogPostComponentsPage.title), 5000);
    expect(await blogPostComponentsPage.getTitle()).to.eq('n42cApp.blogPost.home.title');
    await browser.wait(ec.or(ec.visibilityOf(blogPostComponentsPage.entities), ec.visibilityOf(blogPostComponentsPage.noResult)), 1000);
  });

  it('should load create BlogPost page', async () => {
    await blogPostComponentsPage.clickOnCreateButton();
    blogPostUpdatePage = new BlogPostUpdatePage();
    expect(await blogPostUpdatePage.getPageTitle()).to.eq('n42cApp.blogPost.home.createOrEditLabel');
    await blogPostUpdatePage.cancel();
  });

  it('should create and save BlogPosts', async () => {
    const nbButtonsBeforeCreate = await blogPostComponentsPage.countDeleteButtons();

    await blogPostComponentsPage.clickOnCreateButton();

    await promise.all([
      blogPostUpdatePage.setPublishedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      blogPostUpdatePage.setModifiedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      // blogPostUpdatePage.authorsSelectLastOption(),
      // blogPostUpdatePage.categoriesSelectLastOption(),
      blogPostUpdatePage.blogSelectLastOption(),
    ]);

    expect(await blogPostUpdatePage.getPublishedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected published value to be equals to 2000-12-31'
    );
    expect(await blogPostUpdatePage.getModifiedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected modified value to be equals to 2000-12-31'
    );

    await blogPostUpdatePage.save();
    expect(await blogPostUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await blogPostComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last BlogPost', async () => {
    const nbButtonsBeforeDelete = await blogPostComponentsPage.countDeleteButtons();
    await blogPostComponentsPage.clickOnLastDeleteButton();

    blogPostDeleteDialog = new BlogPostDeleteDialog();
    expect(await blogPostDeleteDialog.getDialogTitle()).to.eq('n42cApp.blogPost.delete.question');
    await blogPostDeleteDialog.clickOnConfirmButton();

    expect(await blogPostComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
