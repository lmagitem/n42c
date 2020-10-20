import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NinthMissionRuleComponentsPage, NinthMissionRuleDeleteDialog, NinthMissionRuleUpdatePage } from './ninth-mission-rule.page-object';

const expect = chai.expect;

describe('NinthMissionRule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthMissionRuleComponentsPage: NinthMissionRuleComponentsPage;
  let ninthMissionRuleUpdatePage: NinthMissionRuleUpdatePage;
  let ninthMissionRuleDeleteDialog: NinthMissionRuleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthMissionRules', async () => {
    await navBarPage.goToEntity('ninth-mission-rule');
    ninthMissionRuleComponentsPage = new NinthMissionRuleComponentsPage();
    await browser.wait(ec.visibilityOf(ninthMissionRuleComponentsPage.title), 5000);
    expect(await ninthMissionRuleComponentsPage.getTitle()).to.eq('n42cApp.ninthMissionRule.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthMissionRuleComponentsPage.entities), ec.visibilityOf(ninthMissionRuleComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthMissionRule page', async () => {
    await ninthMissionRuleComponentsPage.clickOnCreateButton();
    ninthMissionRuleUpdatePage = new NinthMissionRuleUpdatePage();
    expect(await ninthMissionRuleUpdatePage.getPageTitle()).to.eq('n42cApp.ninthMissionRule.home.createOrEditLabel');
    await ninthMissionRuleUpdatePage.cancel();
  });

  it('should create and save NinthMissionRules', async () => {
    const nbButtonsBeforeCreate = await ninthMissionRuleComponentsPage.countDeleteButtons();

    await ninthMissionRuleComponentsPage.clickOnCreateButton();

    await promise.all([]);

    await ninthMissionRuleUpdatePage.save();
    expect(await ninthMissionRuleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthMissionRuleComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NinthMissionRule', async () => {
    const nbButtonsBeforeDelete = await ninthMissionRuleComponentsPage.countDeleteButtons();
    await ninthMissionRuleComponentsPage.clickOnLastDeleteButton();

    ninthMissionRuleDeleteDialog = new NinthMissionRuleDeleteDialog();
    expect(await ninthMissionRuleDeleteDialog.getDialogTitle()).to.eq('n42cApp.ninthMissionRule.delete.question');
    await ninthMissionRuleDeleteDialog.clickOnConfirmButton();

    expect(await ninthMissionRuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
