import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ShopComponentsPage, ShopDeleteDialog, ShopUpdatePage } from './shop.page-object';

const expect = chai.expect;

describe('Shop e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let shopComponentsPage: ShopComponentsPage;
  let shopUpdatePage: ShopUpdatePage;
  let shopDeleteDialog: ShopDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Shops', async () => {
    await navBarPage.goToEntity('shop');
    shopComponentsPage = new ShopComponentsPage();
    await browser.wait(ec.visibilityOf(shopComponentsPage.title), 5000);
    expect(await shopComponentsPage.getTitle()).to.eq('n42cApp.shop.home.title');
    await browser.wait(ec.or(ec.visibilityOf(shopComponentsPage.entities), ec.visibilityOf(shopComponentsPage.noResult)), 1000);
  });

  it('should load create Shop page', async () => {
    await shopComponentsPage.clickOnCreateButton();
    shopUpdatePage = new ShopUpdatePage();
    expect(await shopUpdatePage.getPageTitle()).to.eq('n42cApp.shop.home.createOrEditLabel');
    await shopUpdatePage.cancel();
  });

  it('should create and save Shops', async () => {
    const nbButtonsBeforeCreate = await shopComponentsPage.countDeleteButtons();

    await shopComponentsPage.clickOnCreateButton();

    await promise.all([shopUpdatePage.setNameInput('name')]);

    expect(await shopUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await shopUpdatePage.save();
    expect(await shopUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await shopComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Shop', async () => {
    const nbButtonsBeforeDelete = await shopComponentsPage.countDeleteButtons();
    await shopComponentsPage.clickOnLastDeleteButton();

    shopDeleteDialog = new ShopDeleteDialog();
    expect(await shopDeleteDialog.getDialogTitle()).to.eq('n42cApp.shop.delete.question');
    await shopDeleteDialog.clickOnConfirmButton();

    expect(await shopComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
