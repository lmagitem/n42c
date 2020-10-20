import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProfilePartComponentsPage, ProfilePartDeleteDialog, ProfilePartUpdatePage } from './profile-part.page-object';

const expect = chai.expect;

describe('ProfilePart e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profilePartComponentsPage: ProfilePartComponentsPage;
  let profilePartUpdatePage: ProfilePartUpdatePage;
  let profilePartDeleteDialog: ProfilePartDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProfileParts', async () => {
    await navBarPage.goToEntity('profile-part');
    profilePartComponentsPage = new ProfilePartComponentsPage();
    await browser.wait(ec.visibilityOf(profilePartComponentsPage.title), 5000);
    expect(await profilePartComponentsPage.getTitle()).to.eq('n42cApp.profilePart.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(profilePartComponentsPage.entities), ec.visibilityOf(profilePartComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProfilePart page', async () => {
    await profilePartComponentsPage.clickOnCreateButton();
    profilePartUpdatePage = new ProfilePartUpdatePage();
    expect(await profilePartUpdatePage.getPageTitle()).to.eq('n42cApp.profilePart.home.createOrEditLabel');
    await profilePartUpdatePage.cancel();
  });

  it('should create and save ProfileParts', async () => {
    const nbButtonsBeforeCreate = await profilePartComponentsPage.countDeleteButtons();

    await profilePartComponentsPage.clickOnCreateButton();

    await promise.all([
      profilePartUpdatePage.setTitleInput('title'),
      profilePartUpdatePage.typeSelectLastOption(),
      profilePartUpdatePage.setIndexInput('5'),
      profilePartUpdatePage.orderSelectLastOption(),
      profilePartUpdatePage.profileSelectLastOption(),
    ]);

    expect(await profilePartUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await profilePartUpdatePage.getIndexInput()).to.eq('5', 'Expected index value to be equals to 5');

    await profilePartUpdatePage.save();
    expect(await profilePartUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profilePartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ProfilePart', async () => {
    const nbButtonsBeforeDelete = await profilePartComponentsPage.countDeleteButtons();
    await profilePartComponentsPage.clickOnLastDeleteButton();

    profilePartDeleteDialog = new ProfilePartDeleteDialog();
    expect(await profilePartDeleteDialog.getDialogTitle()).to.eq('n42cApp.profilePart.delete.question');
    await profilePartDeleteDialog.clickOnConfirmButton();

    expect(await profilePartComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
