import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ProfilePartPreciseItemComponentsPage,
  ProfilePartPreciseItemDeleteDialog,
  ProfilePartPreciseItemUpdatePage,
} from './profile-part-precise-item.page-object';

const expect = chai.expect;

describe('ProfilePartPreciseItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profilePartPreciseItemComponentsPage: ProfilePartPreciseItemComponentsPage;
  let profilePartPreciseItemUpdatePage: ProfilePartPreciseItemUpdatePage;
  let profilePartPreciseItemDeleteDialog: ProfilePartPreciseItemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProfilePartPreciseItems', async () => {
    await navBarPage.goToEntity('profile-part-precise-item');
    profilePartPreciseItemComponentsPage = new ProfilePartPreciseItemComponentsPage();
    await browser.wait(ec.visibilityOf(profilePartPreciseItemComponentsPage.title), 5000);
    expect(await profilePartPreciseItemComponentsPage.getTitle()).to.eq('n42CApp.profilePartPreciseItem.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(profilePartPreciseItemComponentsPage.entities), ec.visibilityOf(profilePartPreciseItemComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProfilePartPreciseItem page', async () => {
    await profilePartPreciseItemComponentsPage.clickOnCreateButton();
    profilePartPreciseItemUpdatePage = new ProfilePartPreciseItemUpdatePage();
    expect(await profilePartPreciseItemUpdatePage.getPageTitle()).to.eq('n42CApp.profilePartPreciseItem.home.createOrEditLabel');
    await profilePartPreciseItemUpdatePage.cancel();
  });

  it('should create and save ProfilePartPreciseItems', async () => {
    const nbButtonsBeforeCreate = await profilePartPreciseItemComponentsPage.countDeleteButtons();

    await profilePartPreciseItemComponentsPage.clickOnCreateButton();

    await promise.all([
      profilePartPreciseItemUpdatePage.setTitleInput('title'),
      profilePartPreciseItemUpdatePage.setSubTitleInput('subTitle'),
      profilePartPreciseItemUpdatePage.setStartInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      profilePartPreciseItemUpdatePage.setEndInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      profilePartPreciseItemUpdatePage.setLocationNameInput('locationName'),
      profilePartPreciseItemUpdatePage.setLocationLatInput('5'),
      profilePartPreciseItemUpdatePage.setLocationLongInput('5'),
      profilePartPreciseItemUpdatePage.setContentInput('content'),
      profilePartPreciseItemUpdatePage.preciseItemsSelectLastOption(),
    ]);

    expect(await profilePartPreciseItemUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await profilePartPreciseItemUpdatePage.getSubTitleInput()).to.eq('subTitle', 'Expected SubTitle value to be equals to subTitle');
    expect(await profilePartPreciseItemUpdatePage.getStartInput()).to.contain(
      '2001-01-01T02:30',
      'Expected start value to be equals to 2000-12-31'
    );
    expect(await profilePartPreciseItemUpdatePage.getEndInput()).to.contain(
      '2001-01-01T02:30',
      'Expected end value to be equals to 2000-12-31'
    );
    expect(await profilePartPreciseItemUpdatePage.getLocationNameInput()).to.eq(
      'locationName',
      'Expected LocationName value to be equals to locationName'
    );
    expect(await profilePartPreciseItemUpdatePage.getLocationLatInput()).to.eq('5', 'Expected locationLat value to be equals to 5');
    expect(await profilePartPreciseItemUpdatePage.getLocationLongInput()).to.eq('5', 'Expected locationLong value to be equals to 5');
    expect(await profilePartPreciseItemUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');

    await profilePartPreciseItemUpdatePage.save();
    expect(await profilePartPreciseItemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profilePartPreciseItemComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProfilePartPreciseItem', async () => {
    const nbButtonsBeforeDelete = await profilePartPreciseItemComponentsPage.countDeleteButtons();
    await profilePartPreciseItemComponentsPage.clickOnLastDeleteButton();

    profilePartPreciseItemDeleteDialog = new ProfilePartPreciseItemDeleteDialog();
    expect(await profilePartPreciseItemDeleteDialog.getDialogTitle()).to.eq('n42CApp.profilePartPreciseItem.delete.question');
    await profilePartPreciseItemDeleteDialog.clickOnConfirmButton();

    expect(await profilePartPreciseItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
