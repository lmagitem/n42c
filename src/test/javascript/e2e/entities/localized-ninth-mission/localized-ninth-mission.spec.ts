import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LocalizedNinthMissionComponentsPage,
  /* LocalizedNinthMissionDeleteDialog, */
  LocalizedNinthMissionUpdatePage,
} from './localized-ninth-mission.page-object';

const expect = chai.expect;

describe('LocalizedNinthMission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedNinthMissionComponentsPage: LocalizedNinthMissionComponentsPage;
  let localizedNinthMissionUpdatePage: LocalizedNinthMissionUpdatePage;
  /* let localizedNinthMissionDeleteDialog: LocalizedNinthMissionDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedNinthMissions', async () => {
    await navBarPage.goToEntity('localized-ninth-mission');
    localizedNinthMissionComponentsPage = new LocalizedNinthMissionComponentsPage();
    await browser.wait(ec.visibilityOf(localizedNinthMissionComponentsPage.title), 5000);
    expect(await localizedNinthMissionComponentsPage.getTitle()).to.eq('n42cApp.localizedNinthMission.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(localizedNinthMissionComponentsPage.entities), ec.visibilityOf(localizedNinthMissionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LocalizedNinthMission page', async () => {
    await localizedNinthMissionComponentsPage.clickOnCreateButton();
    localizedNinthMissionUpdatePage = new LocalizedNinthMissionUpdatePage();
    expect(await localizedNinthMissionUpdatePage.getPageTitle()).to.eq('n42cApp.localizedNinthMission.home.createOrEditLabel');
    await localizedNinthMissionUpdatePage.cancel();
  });

  /* it('should create and save LocalizedNinthMissions', async () => {
        const nbButtonsBeforeCreate = await localizedNinthMissionComponentsPage.countDeleteButtons();

        await localizedNinthMissionComponentsPage.clickOnCreateButton();

        await promise.all([
            localizedNinthMissionUpdatePage.setNameInput('name'),
            localizedNinthMissionUpdatePage.setBriefingInput('briefing'),
            localizedNinthMissionUpdatePage.languageSelectLastOption(),
            localizedNinthMissionUpdatePage.missionSelectLastOption(),
        ]);

        expect(await localizedNinthMissionUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await localizedNinthMissionUpdatePage.getBriefingInput()).to.eq('briefing', 'Expected Briefing value to be equals to briefing');

        await localizedNinthMissionUpdatePage.save();
        expect(await localizedNinthMissionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await localizedNinthMissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last LocalizedNinthMission', async () => {
        const nbButtonsBeforeDelete = await localizedNinthMissionComponentsPage.countDeleteButtons();
        await localizedNinthMissionComponentsPage.clickOnLastDeleteButton();

        localizedNinthMissionDeleteDialog = new LocalizedNinthMissionDeleteDialog();
        expect(await localizedNinthMissionDeleteDialog.getDialogTitle())
            .to.eq('n42cApp.localizedNinthMission.delete.question');
        await localizedNinthMissionDeleteDialog.clickOnConfirmButton();

        expect(await localizedNinthMissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
