import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NinthObjectiveComponentsPage, NinthObjectiveDeleteDialog, NinthObjectiveUpdatePage } from './ninth-objective.page-object';

const expect = chai.expect;

describe('NinthObjective e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthObjectiveComponentsPage: NinthObjectiveComponentsPage;
  let ninthObjectiveUpdatePage: NinthObjectiveUpdatePage;
  let ninthObjectiveDeleteDialog: NinthObjectiveDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthObjectives', async () => {
    await navBarPage.goToEntity('ninth-objective');
    ninthObjectiveComponentsPage = new NinthObjectiveComponentsPage();
    await browser.wait(ec.visibilityOf(ninthObjectiveComponentsPage.title), 5000);
    expect(await ninthObjectiveComponentsPage.getTitle()).to.eq('n42CApp.ninthObjective.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthObjectiveComponentsPage.entities), ec.visibilityOf(ninthObjectiveComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthObjective page', async () => {
    await ninthObjectiveComponentsPage.clickOnCreateButton();
    ninthObjectiveUpdatePage = new NinthObjectiveUpdatePage();
    expect(await ninthObjectiveUpdatePage.getPageTitle()).to.eq('n42CApp.ninthObjective.home.createOrEditLabel');
    await ninthObjectiveUpdatePage.cancel();
  });

  it('should create and save NinthObjectives', async () => {
    const nbButtonsBeforeCreate = await ninthObjectiveComponentsPage.countDeleteButtons();

    await ninthObjectiveComponentsPage.clickOnCreateButton();

    await promise.all([ninthObjectiveUpdatePage.typeSelectLastOption()]);

    const selectedShareable = ninthObjectiveUpdatePage.getShareableInput();
    if (await selectedShareable.isSelected()) {
      await ninthObjectiveUpdatePage.getShareableInput().click();
      expect(await ninthObjectiveUpdatePage.getShareableInput().isSelected(), 'Expected shareable not to be selected').to.be.false;
    } else {
      await ninthObjectiveUpdatePage.getShareableInput().click();
      expect(await ninthObjectiveUpdatePage.getShareableInput().isSelected(), 'Expected shareable to be selected').to.be.true;
    }

    await ninthObjectiveUpdatePage.save();
    expect(await ninthObjectiveUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthObjectiveComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NinthObjective', async () => {
    const nbButtonsBeforeDelete = await ninthObjectiveComponentsPage.countDeleteButtons();
    await ninthObjectiveComponentsPage.clickOnLastDeleteButton();

    ninthObjectiveDeleteDialog = new NinthObjectiveDeleteDialog();
    expect(await ninthObjectiveDeleteDialog.getDialogTitle()).to.eq('n42CApp.ninthObjective.delete.question');
    await ninthObjectiveDeleteDialog.clickOnConfirmButton();

    expect(await ninthObjectiveComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
