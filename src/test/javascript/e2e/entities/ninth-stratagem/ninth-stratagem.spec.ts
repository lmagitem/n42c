import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NinthStratagemComponentsPage, NinthStratagemDeleteDialog, NinthStratagemUpdatePage } from './ninth-stratagem.page-object';

const expect = chai.expect;

describe('NinthStratagem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthStratagemComponentsPage: NinthStratagemComponentsPage;
  let ninthStratagemUpdatePage: NinthStratagemUpdatePage;
  let ninthStratagemDeleteDialog: NinthStratagemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthStratagems', async () => {
    await navBarPage.goToEntity('ninth-stratagem');
    ninthStratagemComponentsPage = new NinthStratagemComponentsPage();
    await browser.wait(ec.visibilityOf(ninthStratagemComponentsPage.title), 5000);
    expect(await ninthStratagemComponentsPage.getTitle()).to.eq('n42cApp.ninthStratagem.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthStratagemComponentsPage.entities), ec.visibilityOf(ninthStratagemComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthStratagem page', async () => {
    await ninthStratagemComponentsPage.clickOnCreateButton();
    ninthStratagemUpdatePage = new NinthStratagemUpdatePage();
    expect(await ninthStratagemUpdatePage.getPageTitle()).to.eq('n42cApp.ninthStratagem.home.createOrEditLabel');
    await ninthStratagemUpdatePage.cancel();
  });

  it('should create and save NinthStratagems', async () => {
    const nbButtonsBeforeCreate = await ninthStratagemComponentsPage.countDeleteButtons();

    await ninthStratagemComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthStratagemUpdatePage.setCostInput('5'),
      ninthStratagemUpdatePage.factionSelectLastOption(),
      ninthStratagemUpdatePage.subfactionSelectLastOption(),
      ninthStratagemUpdatePage.turnSelectLastOption(),
      ninthStratagemUpdatePage.phaseSelectLastOption(),
      ninthStratagemUpdatePage.groupSelectLastOption(),
    ]);

    expect(await ninthStratagemUpdatePage.getCostInput()).to.eq('5', 'Expected cost value to be equals to 5');

    await ninthStratagemUpdatePage.save();
    expect(await ninthStratagemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthStratagemComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NinthStratagem', async () => {
    const nbButtonsBeforeDelete = await ninthStratagemComponentsPage.countDeleteButtons();
    await ninthStratagemComponentsPage.clickOnLastDeleteButton();

    ninthStratagemDeleteDialog = new NinthStratagemDeleteDialog();
    expect(await ninthStratagemDeleteDialog.getDialogTitle()).to.eq('n42cApp.ninthStratagem.delete.question');
    await ninthStratagemDeleteDialog.clickOnConfirmButton();

    expect(await ninthStratagemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
