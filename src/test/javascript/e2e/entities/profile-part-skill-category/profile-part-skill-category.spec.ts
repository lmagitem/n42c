import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ProfilePartSkillCategoryComponentsPage,
  ProfilePartSkillCategoryDeleteDialog,
  ProfilePartSkillCategoryUpdatePage,
} from './profile-part-skill-category.page-object';

const expect = chai.expect;

describe('ProfilePartSkillCategory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profilePartSkillCategoryComponentsPage: ProfilePartSkillCategoryComponentsPage;
  let profilePartSkillCategoryUpdatePage: ProfilePartSkillCategoryUpdatePage;
  let profilePartSkillCategoryDeleteDialog: ProfilePartSkillCategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProfilePartSkillCategories', async () => {
    await navBarPage.goToEntity('profile-part-skill-category');
    profilePartSkillCategoryComponentsPage = new ProfilePartSkillCategoryComponentsPage();
    await browser.wait(ec.visibilityOf(profilePartSkillCategoryComponentsPage.title), 5000);
    expect(await profilePartSkillCategoryComponentsPage.getTitle()).to.eq('n42CApp.profilePartSkillCategory.home.title');
    await browser.wait(
      ec.or(
        ec.visibilityOf(profilePartSkillCategoryComponentsPage.entities),
        ec.visibilityOf(profilePartSkillCategoryComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create ProfilePartSkillCategory page', async () => {
    await profilePartSkillCategoryComponentsPage.clickOnCreateButton();
    profilePartSkillCategoryUpdatePage = new ProfilePartSkillCategoryUpdatePage();
    expect(await profilePartSkillCategoryUpdatePage.getPageTitle()).to.eq('n42CApp.profilePartSkillCategory.home.createOrEditLabel');
    await profilePartSkillCategoryUpdatePage.cancel();
  });

  it('should create and save ProfilePartSkillCategories', async () => {
    const nbButtonsBeforeCreate = await profilePartSkillCategoryComponentsPage.countDeleteButtons();

    await profilePartSkillCategoryComponentsPage.clickOnCreateButton();

    await promise.all([
      profilePartSkillCategoryUpdatePage.setNameInput('name'),
      profilePartSkillCategoryUpdatePage.setIndexInput('5'),
      profilePartSkillCategoryUpdatePage.profilePartSelectLastOption(),
    ]);

    expect(await profilePartSkillCategoryUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await profilePartSkillCategoryUpdatePage.getIndexInput()).to.eq('5', 'Expected index value to be equals to 5');

    await profilePartSkillCategoryUpdatePage.save();
    expect(await profilePartSkillCategoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profilePartSkillCategoryComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProfilePartSkillCategory', async () => {
    const nbButtonsBeforeDelete = await profilePartSkillCategoryComponentsPage.countDeleteButtons();
    await profilePartSkillCategoryComponentsPage.clickOnLastDeleteButton();

    profilePartSkillCategoryDeleteDialog = new ProfilePartSkillCategoryDeleteDialog();
    expect(await profilePartSkillCategoryDeleteDialog.getDialogTitle()).to.eq('n42CApp.profilePartSkillCategory.delete.question');
    await profilePartSkillCategoryDeleteDialog.clickOnConfirmButton();

    expect(await profilePartSkillCategoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
