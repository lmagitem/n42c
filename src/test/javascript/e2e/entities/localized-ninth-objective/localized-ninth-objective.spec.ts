import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LocalizedNinthObjectiveComponentsPage,
  LocalizedNinthObjectiveDeleteDialog,
  LocalizedNinthObjectiveUpdatePage,
} from './localized-ninth-objective.page-object';

const expect = chai.expect;

describe('LocalizedNinthObjective e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedNinthObjectiveComponentsPage: LocalizedNinthObjectiveComponentsPage;
  let localizedNinthObjectiveUpdatePage: LocalizedNinthObjectiveUpdatePage;
  let localizedNinthObjectiveDeleteDialog: LocalizedNinthObjectiveDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedNinthObjectives', async () => {
    await navBarPage.goToEntity('localized-ninth-objective');
    localizedNinthObjectiveComponentsPage = new LocalizedNinthObjectiveComponentsPage();
    await browser.wait(ec.visibilityOf(localizedNinthObjectiveComponentsPage.title), 5000);
    expect(await localizedNinthObjectiveComponentsPage.getTitle()).to.eq('n42CApp.localizedNinthObjective.home.title');
    await browser.wait(
      ec.or(
        ec.visibilityOf(localizedNinthObjectiveComponentsPage.entities),
        ec.visibilityOf(localizedNinthObjectiveComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create LocalizedNinthObjective page', async () => {
    await localizedNinthObjectiveComponentsPage.clickOnCreateButton();
    localizedNinthObjectiveUpdatePage = new LocalizedNinthObjectiveUpdatePage();
    expect(await localizedNinthObjectiveUpdatePage.getPageTitle()).to.eq('n42CApp.localizedNinthObjective.home.createOrEditLabel');
    await localizedNinthObjectiveUpdatePage.cancel();
  });

  it('should create and save LocalizedNinthObjectives', async () => {
    const nbButtonsBeforeCreate = await localizedNinthObjectiveComponentsPage.countDeleteButtons();

    await localizedNinthObjectiveComponentsPage.clickOnCreateButton();

    await promise.all([
      localizedNinthObjectiveUpdatePage.setNameInput('name'),
      localizedNinthObjectiveUpdatePage.setDescriptionInput('description'),
      localizedNinthObjectiveUpdatePage.objectiveSelectLastOption(),
    ]);

    expect(await localizedNinthObjectiveUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await localizedNinthObjectiveUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await localizedNinthObjectiveUpdatePage.save();
    expect(await localizedNinthObjectiveUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localizedNinthObjectiveComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LocalizedNinthObjective', async () => {
    const nbButtonsBeforeDelete = await localizedNinthObjectiveComponentsPage.countDeleteButtons();
    await localizedNinthObjectiveComponentsPage.clickOnLastDeleteButton();

    localizedNinthObjectiveDeleteDialog = new LocalizedNinthObjectiveDeleteDialog();
    expect(await localizedNinthObjectiveDeleteDialog.getDialogTitle()).to.eq('n42CApp.localizedNinthObjective.delete.question');
    await localizedNinthObjectiveDeleteDialog.clickOnConfirmButton();

    expect(await localizedNinthObjectiveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
