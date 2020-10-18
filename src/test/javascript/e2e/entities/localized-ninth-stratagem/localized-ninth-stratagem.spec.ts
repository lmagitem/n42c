import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LocalizedNinthStratagemComponentsPage,
  LocalizedNinthStratagemDeleteDialog,
  LocalizedNinthStratagemUpdatePage,
} from './localized-ninth-stratagem.page-object';

const expect = chai.expect;

describe('LocalizedNinthStratagem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedNinthStratagemComponentsPage: LocalizedNinthStratagemComponentsPage;
  let localizedNinthStratagemUpdatePage: LocalizedNinthStratagemUpdatePage;
  let localizedNinthStratagemDeleteDialog: LocalizedNinthStratagemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedNinthStratagems', async () => {
    await navBarPage.goToEntity('localized-ninth-stratagem');
    localizedNinthStratagemComponentsPage = new LocalizedNinthStratagemComponentsPage();
    await browser.wait(ec.visibilityOf(localizedNinthStratagemComponentsPage.title), 5000);
    expect(await localizedNinthStratagemComponentsPage.getTitle()).to.eq('n42cApp.localizedNinthStratagem.home.title');
    await browser.wait(
      ec.or(
        ec.visibilityOf(localizedNinthStratagemComponentsPage.entities),
        ec.visibilityOf(localizedNinthStratagemComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create LocalizedNinthStratagem page', async () => {
    await localizedNinthStratagemComponentsPage.clickOnCreateButton();
    localizedNinthStratagemUpdatePage = new LocalizedNinthStratagemUpdatePage();
    expect(await localizedNinthStratagemUpdatePage.getPageTitle()).to.eq('n42cApp.localizedNinthStratagem.home.createOrEditLabel');
    await localizedNinthStratagemUpdatePage.cancel();
  });

  it('should create and save LocalizedNinthStratagems', async () => {
    const nbButtonsBeforeCreate = await localizedNinthStratagemComponentsPage.countDeleteButtons();

    await localizedNinthStratagemComponentsPage.clickOnCreateButton();

    await promise.all([
      localizedNinthStratagemUpdatePage.setNameInput('name'),
      localizedNinthStratagemUpdatePage.setSummaryInput('summary'),
      localizedNinthStratagemUpdatePage.setDescriptionInput('description'),
      localizedNinthStratagemUpdatePage.setKeywordsInput('keywords'),
      localizedNinthStratagemUpdatePage.languageSelectLastOption(),
      localizedNinthStratagemUpdatePage.stratagemSelectLastOption(),
    ]);

    expect(await localizedNinthStratagemUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await localizedNinthStratagemUpdatePage.getSummaryInput()).to.eq('summary', 'Expected Summary value to be equals to summary');
    expect(await localizedNinthStratagemUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await localizedNinthStratagemUpdatePage.getKeywordsInput()).to.eq(
      'keywords',
      'Expected Keywords value to be equals to keywords'
    );

    await localizedNinthStratagemUpdatePage.save();
    expect(await localizedNinthStratagemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localizedNinthStratagemComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LocalizedNinthStratagem', async () => {
    const nbButtonsBeforeDelete = await localizedNinthStratagemComponentsPage.countDeleteButtons();
    await localizedNinthStratagemComponentsPage.clickOnLastDeleteButton();

    localizedNinthStratagemDeleteDialog = new LocalizedNinthStratagemDeleteDialog();
    expect(await localizedNinthStratagemDeleteDialog.getDialogTitle()).to.eq('n42cApp.localizedNinthStratagem.delete.question');
    await localizedNinthStratagemDeleteDialog.clickOnConfirmButton();

    expect(await localizedNinthStratagemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
