import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  NinthUnitComponentsPage,
  /* NinthUnitDeleteDialog, */
  NinthUnitUpdatePage,
} from './ninth-unit.page-object';

const expect = chai.expect;

describe('NinthUnit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthUnitComponentsPage: NinthUnitComponentsPage;
  let ninthUnitUpdatePage: NinthUnitUpdatePage;
  /* let ninthUnitDeleteDialog: NinthUnitDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthUnits', async () => {
    await navBarPage.goToEntity('ninth-unit');
    ninthUnitComponentsPage = new NinthUnitComponentsPage();
    await browser.wait(ec.visibilityOf(ninthUnitComponentsPage.title), 5000);
    expect(await ninthUnitComponentsPage.getTitle()).to.eq('n42cApp.ninthUnit.home.title');
    await browser.wait(ec.or(ec.visibilityOf(ninthUnitComponentsPage.entities), ec.visibilityOf(ninthUnitComponentsPage.noResult)), 1000);
  });

  it('should load create NinthUnit page', async () => {
    await ninthUnitComponentsPage.clickOnCreateButton();
    ninthUnitUpdatePage = new NinthUnitUpdatePage();
    expect(await ninthUnitUpdatePage.getPageTitle()).to.eq('n42cApp.ninthUnit.home.createOrEditLabel');
    await ninthUnitUpdatePage.cancel();
  });

  /* it('should create and save NinthUnits', async () => {
        const nbButtonsBeforeCreate = await ninthUnitComponentsPage.countDeleteButtons();

        await ninthUnitComponentsPage.clickOnCreateButton();

        await promise.all([
            ninthUnitUpdatePage.setNameInput('name'),
            ninthUnitUpdatePage.setDatasheetInput('datasheet'),
            ninthUnitUpdatePage.factionSelectLastOption(),
            ninthUnitUpdatePage.subfactionSelectLastOption(),
            ninthUnitUpdatePage.battlefieldRoleSelectLastOption(),
            ninthUnitUpdatePage.setKeywordsInput('keywords'),
            ninthUnitUpdatePage.ownerSelectLastOption(),
        ]);

        expect(await ninthUnitUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        expect(await ninthUnitUpdatePage.getDatasheetInput()).to.eq('datasheet', 'Expected Datasheet value to be equals to datasheet');
        expect(await ninthUnitUpdatePage.getKeywordsInput()).to.eq('keywords', 'Expected Keywords value to be equals to keywords');

        await ninthUnitUpdatePage.save();
        expect(await ninthUnitUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await ninthUnitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last NinthUnit', async () => {
        const nbButtonsBeforeDelete = await ninthUnitComponentsPage.countDeleteButtons();
        await ninthUnitComponentsPage.clickOnLastDeleteButton();

        ninthUnitDeleteDialog = new NinthUnitDeleteDialog();
        expect(await ninthUnitDeleteDialog.getDialogTitle())
            .to.eq('n42cApp.ninthUnit.delete.question');
        await ninthUnitDeleteDialog.clickOnConfirmButton();

        expect(await ninthUnitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
