import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NinthCampaignComponentsPage, NinthCampaignDeleteDialog, NinthCampaignUpdatePage } from './ninth-campaign.page-object';

const expect = chai.expect;

describe('NinthCampaign e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthCampaignComponentsPage: NinthCampaignComponentsPage;
  let ninthCampaignUpdatePage: NinthCampaignUpdatePage;
  let ninthCampaignDeleteDialog: NinthCampaignDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthCampaigns', async () => {
    await navBarPage.goToEntity('ninth-campaign');
    ninthCampaignComponentsPage = new NinthCampaignComponentsPage();
    await browser.wait(ec.visibilityOf(ninthCampaignComponentsPage.title), 5000);
    expect(await ninthCampaignComponentsPage.getTitle()).to.eq('n42cApp.ninthCampaign.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthCampaignComponentsPage.entities), ec.visibilityOf(ninthCampaignComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthCampaign page', async () => {
    await ninthCampaignComponentsPage.clickOnCreateButton();
    ninthCampaignUpdatePage = new NinthCampaignUpdatePage();
    expect(await ninthCampaignUpdatePage.getPageTitle()).to.eq('n42cApp.ninthCampaign.home.createOrEditLabel');
    await ninthCampaignUpdatePage.cancel();
  });

  it('should create and save NinthCampaigns', async () => {
    const nbButtonsBeforeCreate = await ninthCampaignComponentsPage.countDeleteButtons();

    await ninthCampaignComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthCampaignUpdatePage.setNameInput('name'),
      ninthCampaignUpdatePage.gameTypeSelectLastOption(),
      ninthCampaignUpdatePage.setDescriptionInput('description'),
      // ninthCampaignUpdatePage.authorsSelectLastOption(),
      // ninthCampaignUpdatePage.participantsSelectLastOption(),
      // ninthCampaignUpdatePage.campaignStratagemsSelectLastOption(),
    ]);

    expect(await ninthCampaignUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    const selectedUsePowerRating = ninthCampaignUpdatePage.getUsePowerRatingInput();
    if (await selectedUsePowerRating.isSelected()) {
      await ninthCampaignUpdatePage.getUsePowerRatingInput().click();
      expect(await ninthCampaignUpdatePage.getUsePowerRatingInput().isSelected(), 'Expected usePowerRating not to be selected').to.be.false;
    } else {
      await ninthCampaignUpdatePage.getUsePowerRatingInput().click();
      expect(await ninthCampaignUpdatePage.getUsePowerRatingInput().isSelected(), 'Expected usePowerRating to be selected').to.be.true;
    }
    expect(await ninthCampaignUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await ninthCampaignUpdatePage.save();
    expect(await ninthCampaignUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthCampaignComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NinthCampaign', async () => {
    const nbButtonsBeforeDelete = await ninthCampaignComponentsPage.countDeleteButtons();
    await ninthCampaignComponentsPage.clickOnLastDeleteButton();

    ninthCampaignDeleteDialog = new NinthCampaignDeleteDialog();
    expect(await ninthCampaignDeleteDialog.getDialogTitle()).to.eq('n42cApp.ninthCampaign.delete.question');
    await ninthCampaignDeleteDialog.clickOnConfirmButton();

    expect(await ninthCampaignComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
