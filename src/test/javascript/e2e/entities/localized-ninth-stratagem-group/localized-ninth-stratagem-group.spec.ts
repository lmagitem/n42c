import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LocalizedNinthStratagemGroupComponentsPage,
  LocalizedNinthStratagemGroupDeleteDialog,
  LocalizedNinthStratagemGroupUpdatePage,
} from './localized-ninth-stratagem-group.page-object';

const expect = chai.expect;

describe('LocalizedNinthStratagemGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedNinthStratagemGroupComponentsPage: LocalizedNinthStratagemGroupComponentsPage;
  let localizedNinthStratagemGroupUpdatePage: LocalizedNinthStratagemGroupUpdatePage;
  let localizedNinthStratagemGroupDeleteDialog: LocalizedNinthStratagemGroupDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedNinthStratagemGroups', async () => {
    await navBarPage.goToEntity('localized-ninth-stratagem-group');
    localizedNinthStratagemGroupComponentsPage = new LocalizedNinthStratagemGroupComponentsPage();
    await browser.wait(ec.visibilityOf(localizedNinthStratagemGroupComponentsPage.title), 5000);
    expect(await localizedNinthStratagemGroupComponentsPage.getTitle()).to.eq('n42cApp.localizedNinthStratagemGroup.home.title');
    await browser.wait(
      ec.or(
        ec.visibilityOf(localizedNinthStratagemGroupComponentsPage.entities),
        ec.visibilityOf(localizedNinthStratagemGroupComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create LocalizedNinthStratagemGroup page', async () => {
    await localizedNinthStratagemGroupComponentsPage.clickOnCreateButton();
    localizedNinthStratagemGroupUpdatePage = new LocalizedNinthStratagemGroupUpdatePage();
    expect(await localizedNinthStratagemGroupUpdatePage.getPageTitle()).to.eq(
      'n42cApp.localizedNinthStratagemGroup.home.createOrEditLabel'
    );
    await localizedNinthStratagemGroupUpdatePage.cancel();
  });

  it('should create and save LocalizedNinthStratagemGroups', async () => {
    const nbButtonsBeforeCreate = await localizedNinthStratagemGroupComponentsPage.countDeleteButtons();

    await localizedNinthStratagemGroupComponentsPage.clickOnCreateButton();

    await promise.all([
      localizedNinthStratagemGroupUpdatePage.setNameInput('name'),
      localizedNinthStratagemGroupUpdatePage.stratagemGroupSelectLastOption(),
    ]);

    expect(await localizedNinthStratagemGroupUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');

    await localizedNinthStratagemGroupUpdatePage.save();
    expect(await localizedNinthStratagemGroupUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localizedNinthStratagemGroupComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LocalizedNinthStratagemGroup', async () => {
    const nbButtonsBeforeDelete = await localizedNinthStratagemGroupComponentsPage.countDeleteButtons();
    await localizedNinthStratagemGroupComponentsPage.clickOnLastDeleteButton();

    localizedNinthStratagemGroupDeleteDialog = new LocalizedNinthStratagemGroupDeleteDialog();
    expect(await localizedNinthStratagemGroupDeleteDialog.getDialogTitle()).to.eq('n42cApp.localizedNinthStratagemGroup.delete.question');
    await localizedNinthStratagemGroupDeleteDialog.clickOnConfirmButton();

    expect(await localizedNinthStratagemGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
