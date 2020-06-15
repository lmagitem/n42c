import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ProfilePartSimpleItemComponentsPage,
  ProfilePartSimpleItemDeleteDialog,
  ProfilePartSimpleItemUpdatePage,
} from './profile-part-simple-item.page-object';

const expect = chai.expect;

describe('ProfilePartSimpleItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profilePartSimpleItemComponentsPage: ProfilePartSimpleItemComponentsPage;
  let profilePartSimpleItemUpdatePage: ProfilePartSimpleItemUpdatePage;
  let profilePartSimpleItemDeleteDialog: ProfilePartSimpleItemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProfilePartSimpleItems', async () => {
    await navBarPage.goToEntity('profile-part-simple-item');
    profilePartSimpleItemComponentsPage = new ProfilePartSimpleItemComponentsPage();
    await browser.wait(ec.visibilityOf(profilePartSimpleItemComponentsPage.title), 5000);
    expect(await profilePartSimpleItemComponentsPage.getTitle()).to.eq('n42CApp.profilePartSimpleItem.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(profilePartSimpleItemComponentsPage.entities), ec.visibilityOf(profilePartSimpleItemComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProfilePartSimpleItem page', async () => {
    await profilePartSimpleItemComponentsPage.clickOnCreateButton();
    profilePartSimpleItemUpdatePage = new ProfilePartSimpleItemUpdatePage();
    expect(await profilePartSimpleItemUpdatePage.getPageTitle()).to.eq('n42CApp.profilePartSimpleItem.home.createOrEditLabel');
    await profilePartSimpleItemUpdatePage.cancel();
  });

  it('should create and save ProfilePartSimpleItems', async () => {
    const nbButtonsBeforeCreate = await profilePartSimpleItemComponentsPage.countDeleteButtons();

    await profilePartSimpleItemComponentsPage.clickOnCreateButton();

    await promise.all([
      profilePartSimpleItemUpdatePage.setTitleInput('title'),
      profilePartSimpleItemUpdatePage.setSubTitleInput('subTitle'),
      profilePartSimpleItemUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      profilePartSimpleItemUpdatePage.setContentInput('content'),
      profilePartSimpleItemUpdatePage.simpleItemsSelectLastOption(),
    ]);

    expect(await profilePartSimpleItemUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await profilePartSimpleItemUpdatePage.getSubTitleInput()).to.eq('subTitle', 'Expected SubTitle value to be equals to subTitle');
    expect(await profilePartSimpleItemUpdatePage.getDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected date value to be equals to 2000-12-31'
    );
    expect(await profilePartSimpleItemUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');

    await profilePartSimpleItemUpdatePage.save();
    expect(await profilePartSimpleItemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profilePartSimpleItemComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProfilePartSimpleItem', async () => {
    const nbButtonsBeforeDelete = await profilePartSimpleItemComponentsPage.countDeleteButtons();
    await profilePartSimpleItemComponentsPage.clickOnLastDeleteButton();

    profilePartSimpleItemDeleteDialog = new ProfilePartSimpleItemDeleteDialog();
    expect(await profilePartSimpleItemDeleteDialog.getDialogTitle()).to.eq('n42CApp.profilePartSimpleItem.delete.question');
    await profilePartSimpleItemDeleteDialog.clickOnConfirmButton();

    expect(await profilePartSimpleItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
