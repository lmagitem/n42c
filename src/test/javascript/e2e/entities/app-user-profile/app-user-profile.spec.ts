import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  AppUserProfileComponentsPage,
  /* AppUserProfileDeleteDialog, */
  AppUserProfileUpdatePage,
} from './app-user-profile.page-object';

const expect = chai.expect;

describe('AppUserProfile e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appUserProfileComponentsPage: AppUserProfileComponentsPage;
  let appUserProfileUpdatePage: AppUserProfileUpdatePage;
  /* let appUserProfileDeleteDialog: AppUserProfileDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AppUserProfiles', async () => {
    await navBarPage.goToEntity('app-user-profile');
    appUserProfileComponentsPage = new AppUserProfileComponentsPage();
    await browser.wait(ec.visibilityOf(appUserProfileComponentsPage.title), 5000);
    expect(await appUserProfileComponentsPage.getTitle()).to.eq('n42cApp.appUserProfile.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(appUserProfileComponentsPage.entities), ec.visibilityOf(appUserProfileComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AppUserProfile page', async () => {
    await appUserProfileComponentsPage.clickOnCreateButton();
    appUserProfileUpdatePage = new AppUserProfileUpdatePage();
    expect(await appUserProfileUpdatePage.getPageTitle()).to.eq('n42cApp.appUserProfile.home.createOrEditLabel');
    await appUserProfileUpdatePage.cancel();
  });

  /* it('should create and save AppUserProfiles', async () => {
        const nbButtonsBeforeCreate = await appUserProfileComponentsPage.countDeleteButtons();

        await appUserProfileComponentsPage.clickOnCreateButton();

        await promise.all([
            appUserProfileUpdatePage.setNameInput('name'),
            appUserProfileUpdatePage.setTitleInput('title'),
            appUserProfileUpdatePage.setSummaryInput('summary'),
            appUserProfileUpdatePage.setHeaderBackgroundURIInput('headerBackgroundURI'),
            appUserProfileUpdatePage.languageSelectLastOption(),
            appUserProfileUpdatePage.userSelectLastOption(),
        ]);

        expect(await appUserProfileUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await appUserProfileUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
        expect(await appUserProfileUpdatePage.getSummaryInput()).to.eq('summary', 'Expected Summary value to be equals to summary');
        expect(await appUserProfileUpdatePage.getHeaderBackgroundURIInput()).to.eq('headerBackgroundURI', 'Expected HeaderBackgroundURI value to be equals to headerBackgroundURI');

        await appUserProfileUpdatePage.save();
        expect(await appUserProfileUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await appUserProfileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last AppUserProfile', async () => {
        const nbButtonsBeforeDelete = await appUserProfileComponentsPage.countDeleteButtons();
        await appUserProfileComponentsPage.clickOnLastDeleteButton();

        appUserProfileDeleteDialog = new AppUserProfileDeleteDialog();
        expect(await appUserProfileDeleteDialog.getDialogTitle())
            .to.eq('n42cApp.appUserProfile.delete.question');
        await appUserProfileDeleteDialog.clickOnConfirmButton();

        expect(await appUserProfileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
