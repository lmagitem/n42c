import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  NinthCampaignMomentComponentsPage,
  NinthCampaignMomentDeleteDialog,
  NinthCampaignMomentUpdatePage,
} from './ninth-campaign-moment.page-object';

const expect = chai.expect;

describe('NinthCampaignMoment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthCampaignMomentComponentsPage: NinthCampaignMomentComponentsPage;
  let ninthCampaignMomentUpdatePage: NinthCampaignMomentUpdatePage;
  let ninthCampaignMomentDeleteDialog: NinthCampaignMomentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthCampaignMoments', async () => {
    await navBarPage.goToEntity('ninth-campaign-moment');
    ninthCampaignMomentComponentsPage = new NinthCampaignMomentComponentsPage();
    await browser.wait(ec.visibilityOf(ninthCampaignMomentComponentsPage.title), 5000);
    expect(await ninthCampaignMomentComponentsPage.getTitle()).to.eq('n42CApp.ninthCampaignMoment.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthCampaignMomentComponentsPage.entities), ec.visibilityOf(ninthCampaignMomentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthCampaignMoment page', async () => {
    await ninthCampaignMomentComponentsPage.clickOnCreateButton();
    ninthCampaignMomentUpdatePage = new NinthCampaignMomentUpdatePage();
    expect(await ninthCampaignMomentUpdatePage.getPageTitle()).to.eq('n42CApp.ninthCampaignMoment.home.createOrEditLabel');
    await ninthCampaignMomentUpdatePage.cancel();
  });

  it('should create and save NinthCampaignMoments', async () => {
    const nbButtonsBeforeCreate = await ninthCampaignMomentComponentsPage.countDeleteButtons();

    await ninthCampaignMomentComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthCampaignMomentUpdatePage.setSinceInstantInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      ninthCampaignMomentUpdatePage.setNameInput('name'),
      ninthCampaignMomentUpdatePage.setSummaryInput('summary'),
      ninthCampaignMomentUpdatePage.setDescriptionInput('description'),
      ninthCampaignMomentUpdatePage.campaignSelectLastOption(),
    ]);

    const selectedCurrent = ninthCampaignMomentUpdatePage.getCurrentInput();
    if (await selectedCurrent.isSelected()) {
      await ninthCampaignMomentUpdatePage.getCurrentInput().click();
      expect(await ninthCampaignMomentUpdatePage.getCurrentInput().isSelected(), 'Expected current not to be selected').to.be.false;
    } else {
      await ninthCampaignMomentUpdatePage.getCurrentInput().click();
      expect(await ninthCampaignMomentUpdatePage.getCurrentInput().isSelected(), 'Expected current to be selected').to.be.true;
    }
    expect(await ninthCampaignMomentUpdatePage.getSinceInstantInput()).to.contain(
      '2001-01-01T02:30',
      'Expected sinceInstant value to be equals to 2000-12-31'
    );
    expect(await ninthCampaignMomentUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await ninthCampaignMomentUpdatePage.getSummaryInput()).to.eq('summary', 'Expected Summary value to be equals to summary');
    expect(await ninthCampaignMomentUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await ninthCampaignMomentUpdatePage.save();
    expect(await ninthCampaignMomentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthCampaignMomentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NinthCampaignMoment', async () => {
    const nbButtonsBeforeDelete = await ninthCampaignMomentComponentsPage.countDeleteButtons();
    await ninthCampaignMomentComponentsPage.clickOnLastDeleteButton();

    ninthCampaignMomentDeleteDialog = new NinthCampaignMomentDeleteDialog();
    expect(await ninthCampaignMomentDeleteDialog.getDialogTitle()).to.eq('n42CApp.ninthCampaignMoment.delete.question');
    await ninthCampaignMomentDeleteDialog.clickOnConfirmButton();

    expect(await ninthCampaignMomentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
