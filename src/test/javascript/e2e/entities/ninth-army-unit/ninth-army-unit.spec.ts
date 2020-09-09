import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NinthArmyUnitComponentsPage, NinthArmyUnitDeleteDialog, NinthArmyUnitUpdatePage } from './ninth-army-unit.page-object';

const expect = chai.expect;

describe('NinthArmyUnit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthArmyUnitComponentsPage: NinthArmyUnitComponentsPage;
  let ninthArmyUnitUpdatePage: NinthArmyUnitUpdatePage;
  let ninthArmyUnitDeleteDialog: NinthArmyUnitDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthArmyUnits', async () => {
    await navBarPage.goToEntity('ninth-army-unit');
    ninthArmyUnitComponentsPage = new NinthArmyUnitComponentsPage();
    await browser.wait(ec.visibilityOf(ninthArmyUnitComponentsPage.title), 5000);
    expect(await ninthArmyUnitComponentsPage.getTitle()).to.eq('n42CApp.ninthArmyUnit.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthArmyUnitComponentsPage.entities), ec.visibilityOf(ninthArmyUnitComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthArmyUnit page', async () => {
    await ninthArmyUnitComponentsPage.clickOnCreateButton();
    ninthArmyUnitUpdatePage = new NinthArmyUnitUpdatePage();
    expect(await ninthArmyUnitUpdatePage.getPageTitle()).to.eq('n42CApp.ninthArmyUnit.home.createOrEditLabel');
    await ninthArmyUnitUpdatePage.cancel();
  });

  it('should create and save NinthArmyUnits', async () => {
    const nbButtonsBeforeCreate = await ninthArmyUnitComponentsPage.countDeleteButtons();

    await ninthArmyUnitComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthArmyUnitUpdatePage.setSelectableKeywordsInput('selectableKeywords'),
      ninthArmyUnitUpdatePage.armySelectLastOption(),
      ninthArmyUnitUpdatePage.unitSelectLastOption(),
    ]);

    expect(await ninthArmyUnitUpdatePage.getSelectableKeywordsInput()).to.eq(
      'selectableKeywords',
      'Expected SelectableKeywords value to be equals to selectableKeywords'
    );

    await ninthArmyUnitUpdatePage.save();
    expect(await ninthArmyUnitUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthArmyUnitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NinthArmyUnit', async () => {
    const nbButtonsBeforeDelete = await ninthArmyUnitComponentsPage.countDeleteButtons();
    await ninthArmyUnitComponentsPage.clickOnLastDeleteButton();

    ninthArmyUnitDeleteDialog = new NinthArmyUnitDeleteDialog();
    expect(await ninthArmyUnitDeleteDialog.getDialogTitle()).to.eq('n42CApp.ninthArmyUnit.delete.question');
    await ninthArmyUnitDeleteDialog.clickOnConfirmButton();

    expect(await ninthArmyUnitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
