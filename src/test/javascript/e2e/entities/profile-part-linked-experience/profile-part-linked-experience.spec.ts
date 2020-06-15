import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ProfilePartLinkedExperienceComponentsPage,
  ProfilePartLinkedExperienceDeleteDialog,
  ProfilePartLinkedExperienceUpdatePage,
} from './profile-part-linked-experience.page-object';

const expect = chai.expect;

describe('ProfilePartLinkedExperience e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profilePartLinkedExperienceComponentsPage: ProfilePartLinkedExperienceComponentsPage;
  let profilePartLinkedExperienceUpdatePage: ProfilePartLinkedExperienceUpdatePage;
  let profilePartLinkedExperienceDeleteDialog: ProfilePartLinkedExperienceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProfilePartLinkedExperiences', async () => {
    await navBarPage.goToEntity('profile-part-linked-experience');
    profilePartLinkedExperienceComponentsPage = new ProfilePartLinkedExperienceComponentsPage();
    await browser.wait(ec.visibilityOf(profilePartLinkedExperienceComponentsPage.title), 5000);
    expect(await profilePartLinkedExperienceComponentsPage.getTitle()).to.eq('n42cApp.profilePartLinkedExperience.home.title');
    await browser.wait(
      ec.or(
        ec.visibilityOf(profilePartLinkedExperienceComponentsPage.entities),
        ec.visibilityOf(profilePartLinkedExperienceComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create ProfilePartLinkedExperience page', async () => {
    await profilePartLinkedExperienceComponentsPage.clickOnCreateButton();
    profilePartLinkedExperienceUpdatePage = new ProfilePartLinkedExperienceUpdatePage();
    expect(await profilePartLinkedExperienceUpdatePage.getPageTitle()).to.eq('n42cApp.profilePartLinkedExperience.home.createOrEditLabel');
    await profilePartLinkedExperienceUpdatePage.cancel();
  });

  it('should create and save ProfilePartLinkedExperiences', async () => {
    const nbButtonsBeforeCreate = await profilePartLinkedExperienceComponentsPage.countDeleteButtons();

    await profilePartLinkedExperienceComponentsPage.clickOnCreateButton();

    await promise.all([
      profilePartLinkedExperienceUpdatePage.setTitleInput('title'),
      profilePartLinkedExperienceUpdatePage.setSubTitleInput('subTitle'),
      profilePartLinkedExperienceUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      profilePartLinkedExperienceUpdatePage.setContentInput('content'),
      profilePartLinkedExperienceUpdatePage.experiencesSelectLastOption(),
    ]);

    expect(await profilePartLinkedExperienceUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await profilePartLinkedExperienceUpdatePage.getSubTitleInput()).to.eq(
      'subTitle',
      'Expected SubTitle value to be equals to subTitle'
    );
    expect(await profilePartLinkedExperienceUpdatePage.getDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected date value to be equals to 2000-12-31'
    );
    expect(await profilePartLinkedExperienceUpdatePage.getContentInput()).to.eq(
      'content',
      'Expected Content value to be equals to content'
    );

    await profilePartLinkedExperienceUpdatePage.save();
    expect(await profilePartLinkedExperienceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profilePartLinkedExperienceComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProfilePartLinkedExperience', async () => {
    const nbButtonsBeforeDelete = await profilePartLinkedExperienceComponentsPage.countDeleteButtons();
    await profilePartLinkedExperienceComponentsPage.clickOnLastDeleteButton();

    profilePartLinkedExperienceDeleteDialog = new ProfilePartLinkedExperienceDeleteDialog();
    expect(await profilePartLinkedExperienceDeleteDialog.getDialogTitle()).to.eq('n42cApp.profilePartLinkedExperience.delete.question');
    await profilePartLinkedExperienceDeleteDialog.clickOnConfirmButton();

    expect(await profilePartLinkedExperienceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
