import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProfilePartSkillComponentsPage, ProfilePartSkillDeleteDialog, ProfilePartSkillUpdatePage } from './profile-part-skill.page-object';

const expect = chai.expect;

describe('ProfilePartSkill e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profilePartSkillComponentsPage: ProfilePartSkillComponentsPage;
  let profilePartSkillUpdatePage: ProfilePartSkillUpdatePage;
  let profilePartSkillDeleteDialog: ProfilePartSkillDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProfilePartSkills', async () => {
    await navBarPage.goToEntity('profile-part-skill');
    profilePartSkillComponentsPage = new ProfilePartSkillComponentsPage();
    await browser.wait(ec.visibilityOf(profilePartSkillComponentsPage.title), 5000);
    expect(await profilePartSkillComponentsPage.getTitle()).to.eq('n42cApp.profilePartSkill.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(profilePartSkillComponentsPage.entities), ec.visibilityOf(profilePartSkillComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProfilePartSkill page', async () => {
    await profilePartSkillComponentsPage.clickOnCreateButton();
    profilePartSkillUpdatePage = new ProfilePartSkillUpdatePage();
    expect(await profilePartSkillUpdatePage.getPageTitle()).to.eq('n42cApp.profilePartSkill.home.createOrEditLabel');
    await profilePartSkillUpdatePage.cancel();
  });

  it('should create and save ProfilePartSkills', async () => {
    const nbButtonsBeforeCreate = await profilePartSkillComponentsPage.countDeleteButtons();

    await profilePartSkillComponentsPage.clickOnCreateButton();

    await promise.all([
      profilePartSkillUpdatePage.setNameInput('name'),
      profilePartSkillUpdatePage.setIndexInput('5'),
      profilePartSkillUpdatePage.levelSelectLastOption(),
      // profilePartSkillUpdatePage.linkedSkillsSelectLastOption(),
      profilePartSkillUpdatePage.skillsSelectLastOption(),
    ]);

    expect(await profilePartSkillUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await profilePartSkillUpdatePage.getIndexInput()).to.eq('5', 'Expected index value to be equals to 5');

    await profilePartSkillUpdatePage.save();
    expect(await profilePartSkillUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profilePartSkillComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProfilePartSkill', async () => {
    const nbButtonsBeforeDelete = await profilePartSkillComponentsPage.countDeleteButtons();
    await profilePartSkillComponentsPage.clickOnLastDeleteButton();

    profilePartSkillDeleteDialog = new ProfilePartSkillDeleteDialog();
    expect(await profilePartSkillDeleteDialog.getDialogTitle()).to.eq('n42cApp.profilePartSkill.delete.question');
    await profilePartSkillDeleteDialog.clickOnConfirmButton();

    expect(await profilePartSkillComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
