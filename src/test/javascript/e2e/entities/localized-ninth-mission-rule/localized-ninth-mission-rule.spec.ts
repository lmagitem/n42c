import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LocalizedNinthMissionRuleComponentsPage,
  LocalizedNinthMissionRuleDeleteDialog,
  LocalizedNinthMissionRuleUpdatePage,
} from './localized-ninth-mission-rule.page-object';

const expect = chai.expect;

describe('LocalizedNinthMissionRule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedNinthMissionRuleComponentsPage: LocalizedNinthMissionRuleComponentsPage;
  let localizedNinthMissionRuleUpdatePage: LocalizedNinthMissionRuleUpdatePage;
  let localizedNinthMissionRuleDeleteDialog: LocalizedNinthMissionRuleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedNinthMissionRules', async () => {
    await navBarPage.goToEntity('localized-ninth-mission-rule');
    localizedNinthMissionRuleComponentsPage = new LocalizedNinthMissionRuleComponentsPage();
    await browser.wait(ec.visibilityOf(localizedNinthMissionRuleComponentsPage.title), 5000);
    expect(await localizedNinthMissionRuleComponentsPage.getTitle()).to.eq('n42cApp.localizedNinthMissionRule.home.title');
    await browser.wait(
      ec.or(
        ec.visibilityOf(localizedNinthMissionRuleComponentsPage.entities),
        ec.visibilityOf(localizedNinthMissionRuleComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create LocalizedNinthMissionRule page', async () => {
    await localizedNinthMissionRuleComponentsPage.clickOnCreateButton();
    localizedNinthMissionRuleUpdatePage = new LocalizedNinthMissionRuleUpdatePage();
    expect(await localizedNinthMissionRuleUpdatePage.getPageTitle()).to.eq('n42cApp.localizedNinthMissionRule.home.createOrEditLabel');
    await localizedNinthMissionRuleUpdatePage.cancel();
  });

  it('should create and save LocalizedNinthMissionRules', async () => {
    const nbButtonsBeforeCreate = await localizedNinthMissionRuleComponentsPage.countDeleteButtons();

    await localizedNinthMissionRuleComponentsPage.clickOnCreateButton();

    await promise.all([
      localizedNinthMissionRuleUpdatePage.setNameInput('name'),
      localizedNinthMissionRuleUpdatePage.setDescriptionInput('description'),
      localizedNinthMissionRuleUpdatePage.languageSelectLastOption(),
      localizedNinthMissionRuleUpdatePage.ruleSelectLastOption(),
    ]);

    expect(await localizedNinthMissionRuleUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await localizedNinthMissionRuleUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await localizedNinthMissionRuleUpdatePage.save();
    expect(await localizedNinthMissionRuleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localizedNinthMissionRuleComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LocalizedNinthMissionRule', async () => {
    const nbButtonsBeforeDelete = await localizedNinthMissionRuleComponentsPage.countDeleteButtons();
    await localizedNinthMissionRuleComponentsPage.clickOnLastDeleteButton();

    localizedNinthMissionRuleDeleteDialog = new LocalizedNinthMissionRuleDeleteDialog();
    expect(await localizedNinthMissionRuleDeleteDialog.getDialogTitle()).to.eq('n42cApp.localizedNinthMissionRule.delete.question');
    await localizedNinthMissionRuleDeleteDialog.clickOnConfirmButton();

    expect(await localizedNinthMissionRuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
