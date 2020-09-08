import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NinthMissionComponentsPage, NinthMissionDeleteDialog, NinthMissionUpdatePage } from './ninth-mission.page-object';

const expect = chai.expect;

describe('NinthMission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthMissionComponentsPage: NinthMissionComponentsPage;
  let ninthMissionUpdatePage: NinthMissionUpdatePage;
  let ninthMissionDeleteDialog: NinthMissionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthMissions', async () => {
    await navBarPage.goToEntity('ninth-mission');
    ninthMissionComponentsPage = new NinthMissionComponentsPage();
    await browser.wait(ec.visibilityOf(ninthMissionComponentsPage.title), 5000);
    expect(await ninthMissionComponentsPage.getTitle()).to.eq('n42CApp.ninthMission.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthMissionComponentsPage.entities), ec.visibilityOf(ninthMissionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthMission page', async () => {
    await ninthMissionComponentsPage.clickOnCreateButton();
    ninthMissionUpdatePage = new NinthMissionUpdatePage();
    expect(await ninthMissionUpdatePage.getPageTitle()).to.eq('n42CApp.ninthMission.home.createOrEditLabel');
    await ninthMissionUpdatePage.cancel();
  });

  it('should create and save NinthMissions', async () => {
    const nbButtonsBeforeCreate = await ninthMissionComponentsPage.countDeleteButtons();

    await ninthMissionComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthMissionUpdatePage.gameTypeSelectLastOption(),
      ninthMissionUpdatePage.gameSizeSelectLastOption(),
      // ninthMissionUpdatePage.missionStratagemsSelectLastOption(),
      // ninthMissionUpdatePage.primaryObjectivesSelectLastOption(),
      // ninthMissionUpdatePage.allowedSecondariesSelectLastOption(),
      // ninthMissionUpdatePage.rulesSelectLastOption(),
    ]);

    const selectedShareable = ninthMissionUpdatePage.getShareableInput();
    if (await selectedShareable.isSelected()) {
      await ninthMissionUpdatePage.getShareableInput().click();
      expect(await ninthMissionUpdatePage.getShareableInput().isSelected(), 'Expected shareable not to be selected').to.be.false;
    } else {
      await ninthMissionUpdatePage.getShareableInput().click();
      expect(await ninthMissionUpdatePage.getShareableInput().isSelected(), 'Expected shareable to be selected').to.be.true;
    }

    await ninthMissionUpdatePage.save();
    expect(await ninthMissionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthMissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last NinthMission', async () => {
    const nbButtonsBeforeDelete = await ninthMissionComponentsPage.countDeleteButtons();
    await ninthMissionComponentsPage.clickOnLastDeleteButton();

    ninthMissionDeleteDialog = new NinthMissionDeleteDialog();
    expect(await ninthMissionDeleteDialog.getDialogTitle()).to.eq('n42CApp.ninthMission.delete.question');
    await ninthMissionDeleteDialog.clickOnConfirmButton();

    expect(await ninthMissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
