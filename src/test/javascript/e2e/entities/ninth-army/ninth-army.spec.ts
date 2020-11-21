import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  NinthArmyComponentsPage,
  /* NinthArmyDeleteDialog, */
  NinthArmyUpdatePage,
} from './ninth-army.page-object';

const expect = chai.expect;

describe('NinthArmy e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthArmyComponentsPage: NinthArmyComponentsPage;
  let ninthArmyUpdatePage: NinthArmyUpdatePage;
  /* let ninthArmyDeleteDialog: NinthArmyDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthArmies', async () => {
    await navBarPage.goToEntity('ninth-army');
    ninthArmyComponentsPage = new NinthArmyComponentsPage();
    await browser.wait(ec.visibilityOf(ninthArmyComponentsPage.title), 5000);
    expect(await ninthArmyComponentsPage.getTitle()).to.eq('n42cApp.ninthArmy.home.title');
    await browser.wait(ec.or(ec.visibilityOf(ninthArmyComponentsPage.entities), ec.visibilityOf(ninthArmyComponentsPage.noResult)), 1000);
  });

  it('should load create NinthArmy page', async () => {
    await ninthArmyComponentsPage.clickOnCreateButton();
    ninthArmyUpdatePage = new NinthArmyUpdatePage();
    expect(await ninthArmyUpdatePage.getPageTitle()).to.eq('n42cApp.ninthArmy.home.createOrEditLabel');
    await ninthArmyUpdatePage.cancel();
  });

  /* it('should create and save NinthArmies', async () => {
        const nbButtonsBeforeCreate = await ninthArmyComponentsPage.countDeleteButtons();

        await ninthArmyComponentsPage.clickOnCreateButton();

        await promise.all([
            ninthArmyUpdatePage.setNameInput('name'),
            ninthArmyUpdatePage.factionSelectLastOption(),
            ninthArmyUpdatePage.subfactionSelectLastOption(),
            ninthArmyUpdatePage.authorSelectLastOption(),
        ]);

        expect(await ninthArmyUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
        const selectedCrusade = ninthArmyUpdatePage.getCrusadeInput();
        if (await selectedCrusade.isSelected()) {
            await ninthArmyUpdatePage.getCrusadeInput().click();
            expect(await ninthArmyUpdatePage.getCrusadeInput().isSelected(), 'Expected crusade not to be selected').to.be.false;
        } else {
            await ninthArmyUpdatePage.getCrusadeInput().click();
            expect(await ninthArmyUpdatePage.getCrusadeInput().isSelected(), 'Expected crusade to be selected').to.be.true;
        }

        await ninthArmyUpdatePage.save();
        expect(await ninthArmyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await ninthArmyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last NinthArmy', async () => {
        const nbButtonsBeforeDelete = await ninthArmyComponentsPage.countDeleteButtons();
        await ninthArmyComponentsPage.clickOnLastDeleteButton();

        ninthArmyDeleteDialog = new NinthArmyDeleteDialog();
        expect(await ninthArmyDeleteDialog.getDialogTitle())
            .to.eq('n42cApp.ninthArmy.delete.question');
        await ninthArmyDeleteDialog.clickOnConfirmButton();

        expect(await ninthArmyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
