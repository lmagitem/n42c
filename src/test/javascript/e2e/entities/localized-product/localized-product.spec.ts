import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LocalizedProductComponentsPage, LocalizedProductDeleteDialog, LocalizedProductUpdatePage } from './localized-product.page-object';

const expect = chai.expect;

describe('LocalizedProduct e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedProductComponentsPage: LocalizedProductComponentsPage;
  let localizedProductUpdatePage: LocalizedProductUpdatePage;
  let localizedProductDeleteDialog: LocalizedProductDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedProducts', async () => {
    await navBarPage.goToEntity('localized-product');
    localizedProductComponentsPage = new LocalizedProductComponentsPage();
    await browser.wait(ec.visibilityOf(localizedProductComponentsPage.title), 5000);
    expect(await localizedProductComponentsPage.getTitle()).to.eq('n42cApp.localizedProduct.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(localizedProductComponentsPage.entities), ec.visibilityOf(localizedProductComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LocalizedProduct page', async () => {
    await localizedProductComponentsPage.clickOnCreateButton();
    localizedProductUpdatePage = new LocalizedProductUpdatePage();
    expect(await localizedProductUpdatePage.getPageTitle()).to.eq('n42cApp.localizedProduct.home.createOrEditLabel');
    await localizedProductUpdatePage.cancel();
  });

  it('should create and save LocalizedProducts', async () => {
    const nbButtonsBeforeCreate = await localizedProductComponentsPage.countDeleteButtons();

    await localizedProductComponentsPage.clickOnCreateButton();

    await promise.all([
      localizedProductUpdatePage.setNameInput('name'),
      localizedProductUpdatePage.setExcerptInput('excerpt'),
      localizedProductUpdatePage.setPictureUrlInput('pictureUrl'),
      localizedProductUpdatePage.setContentInput('content'),
      localizedProductUpdatePage.languageSelectLastOption(),
      localizedProductUpdatePage.productSelectLastOption(),
    ]);

    expect(await localizedProductUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await localizedProductUpdatePage.getExcerptInput()).to.eq('excerpt', 'Expected Excerpt value to be equals to excerpt');
    expect(await localizedProductUpdatePage.getPictureUrlInput()).to.eq(
      'pictureUrl',
      'Expected PictureUrl value to be equals to pictureUrl'
    );
    expect(await localizedProductUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');

    await localizedProductUpdatePage.save();
    expect(await localizedProductUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localizedProductComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LocalizedProduct', async () => {
    const nbButtonsBeforeDelete = await localizedProductComponentsPage.countDeleteButtons();
    await localizedProductComponentsPage.clickOnLastDeleteButton();

    localizedProductDeleteDialog = new LocalizedProductDeleteDialog();
    expect(await localizedProductDeleteDialog.getDialogTitle()).to.eq('n42cApp.localizedProduct.delete.question');
    await localizedProductDeleteDialog.clickOnConfirmButton();

    expect(await localizedProductComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
