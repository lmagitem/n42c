import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NinthBattleComponentsPage, NinthBattleDeleteDialog, NinthBattleUpdatePage } from './ninth-battle.page-object';

const expect = chai.expect;

describe('NinthBattle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthBattleComponentsPage: NinthBattleComponentsPage;
  let ninthBattleUpdatePage: NinthBattleUpdatePage;
  let ninthBattleDeleteDialog: NinthBattleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthBattles', async () => {
    await navBarPage.goToEntity('ninth-battle');
    ninthBattleComponentsPage = new NinthBattleComponentsPage();
    await browser.wait(ec.visibilityOf(ninthBattleComponentsPage.title), 5000);
    expect(await ninthBattleComponentsPage.getTitle()).to.eq('n42cApp.ninthBattle.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthBattleComponentsPage.entities), ec.visibilityOf(ninthBattleComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthBattle page', async () => {
    await ninthBattleComponentsPage.clickOnCreateButton();
    ninthBattleUpdatePage = new NinthBattleUpdatePage();
    expect(await ninthBattleUpdatePage.getPageTitle()).to.eq('n42cApp.ninthBattle.home.createOrEditLabel');
    await ninthBattleUpdatePage.cancel();
  });

  it('should create and save NinthBattles', async () => {
    const nbButtonsBeforeCreate = await ninthBattleComponentsPage.countDeleteButtons();

    await ninthBattleComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthBattleUpdatePage.setNameInput('name'),
      ninthBattleUpdatePage.campaignMomentSelectLastOption(),
      ninthBattleUpdatePage.missionSelectLastOption(),
    ]);

    expect(await ninthBattleUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await ninthBattleUpdatePage.save();
    expect(await ninthBattleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthBattleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NinthBattle', async () => {
    const nbButtonsBeforeDelete = await ninthBattleComponentsPage.countDeleteButtons();
    await ninthBattleComponentsPage.clickOnLastDeleteButton();

    ninthBattleDeleteDialog = new NinthBattleDeleteDialog();
    expect(await ninthBattleDeleteDialog.getDialogTitle()).to.eq('n42cApp.ninthBattle.delete.question');
    await ninthBattleDeleteDialog.clickOnConfirmButton();

    expect(await ninthBattleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
