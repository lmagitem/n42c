import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AppUserComponentsPage, AppUserDeleteDialog, AppUserUpdatePage } from './app-user.page-object';

const expect = chai.expect;

describe('AppUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appUserComponentsPage: AppUserComponentsPage;
  let appUserUpdatePage: AppUserUpdatePage;
  let appUserDeleteDialog: AppUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AppUsers', async () => {
    await navBarPage.goToEntity('app-user');
    appUserComponentsPage = new AppUserComponentsPage();
    await browser.wait(ec.visibilityOf(appUserComponentsPage.title), 5000);
    expect(await appUserComponentsPage.getTitle()).to.eq('n42cApp.appUser.home.title');
    await browser.wait(ec.or(ec.visibilityOf(appUserComponentsPage.entities), ec.visibilityOf(appUserComponentsPage.noResult)), 1000);
  });

  it('should load create AppUser page', async () => {
    await appUserComponentsPage.clickOnCreateButton();
    appUserUpdatePage = new AppUserUpdatePage();
    expect(await appUserUpdatePage.getPageTitle()).to.eq('n42cApp.appUser.home.createOrEditLabel');
    await appUserUpdatePage.cancel();
  });

  it('should create and save AppUsers', async () => {
    const nbButtonsBeforeCreate = await appUserComponentsPage.countDeleteButtons();

    await appUserComponentsPage.clickOnCreateButton();

    await promise.all([
      appUserUpdatePage.setUserNameInput('userName'),
      appUserUpdatePage.setDisplayedNameInput('displayedName'),
      appUserUpdatePage.setEmailInput('email'),
      appUserUpdatePage.rightsSelectLastOption(),
      appUserUpdatePage.userSelectLastOption(),
    ]);

    expect(await appUserUpdatePage.getUserNameInput()).to.eq('userName', 'Expected UserName value to be equals to userName');
    expect(await appUserUpdatePage.getDisplayedNameInput()).to.eq(
      'displayedName',
      'Expected DisplayedName value to be equals to displayedName'
    );
    expect(await appUserUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    const selectedAdmin = appUserUpdatePage.getAdminInput();
    if (await selectedAdmin.isSelected()) {
      await appUserUpdatePage.getAdminInput().click();
      expect(await appUserUpdatePage.getAdminInput().isSelected(), 'Expected admin not to be selected').to.be.false;
    } else {
      await appUserUpdatePage.getAdminInput().click();
      expect(await appUserUpdatePage.getAdminInput().isSelected(), 'Expected admin to be selected').to.be.true;
    }

    await appUserUpdatePage.save();
    expect(await appUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await appUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AppUser', async () => {
    const nbButtonsBeforeDelete = await appUserComponentsPage.countDeleteButtons();
    await appUserComponentsPage.clickOnLastDeleteButton();

    appUserDeleteDialog = new AppUserDeleteDialog();
    expect(await appUserDeleteDialog.getDialogTitle()).to.eq('n42cApp.appUser.delete.question');
    await appUserDeleteDialog.clickOnConfirmButton();

    expect(await appUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
