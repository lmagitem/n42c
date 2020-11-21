import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  NinthStratagemGroupComponentsPage,
  /* NinthStratagemGroupDeleteDialog, */
  NinthStratagemGroupUpdatePage,
} from './ninth-stratagem-group.page-object';

const expect = chai.expect;

describe('NinthStratagemGroup e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthStratagemGroupComponentsPage: NinthStratagemGroupComponentsPage;
  let ninthStratagemGroupUpdatePage: NinthStratagemGroupUpdatePage;
  /* let ninthStratagemGroupDeleteDialog: NinthStratagemGroupDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthStratagemGroups', async () => {
    await navBarPage.goToEntity('ninth-stratagem-group');
    ninthStratagemGroupComponentsPage = new NinthStratagemGroupComponentsPage();
    await browser.wait(ec.visibilityOf(ninthStratagemGroupComponentsPage.title), 5000);
    expect(await ninthStratagemGroupComponentsPage.getTitle()).to.eq('n42cApp.ninthStratagemGroup.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthStratagemGroupComponentsPage.entities), ec.visibilityOf(ninthStratagemGroupComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthStratagemGroup page', async () => {
    await ninthStratagemGroupComponentsPage.clickOnCreateButton();
    ninthStratagemGroupUpdatePage = new NinthStratagemGroupUpdatePage();
    expect(await ninthStratagemGroupUpdatePage.getPageTitle()).to.eq('n42cApp.ninthStratagemGroup.home.createOrEditLabel');
    await ninthStratagemGroupUpdatePage.cancel();
  });

  /* it('should create and save NinthStratagemGroups', async () => {
        const nbButtonsBeforeCreate = await ninthStratagemGroupComponentsPage.countDeleteButtons();

        await ninthStratagemGroupComponentsPage.clickOnCreateButton();

        await promise.all([
            ninthStratagemGroupUpdatePage.authorSelectLastOption(),
        ]);

        const selectedShareable = ninthStratagemGroupUpdatePage.getShareableInput();
        if (await selectedShareable.isSelected()) {
            await ninthStratagemGroupUpdatePage.getShareableInput().click();
            expect(await ninthStratagemGroupUpdatePage.getShareableInput().isSelected(), 'Expected shareable not to be selected').to.be.false;
        } else {
            await ninthStratagemGroupUpdatePage.getShareableInput().click();
            expect(await ninthStratagemGroupUpdatePage.getShareableInput().isSelected(), 'Expected shareable to be selected').to.be.true;
        }

        await ninthStratagemGroupUpdatePage.save();
        expect(await ninthStratagemGroupUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await ninthStratagemGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last NinthStratagemGroup', async () => {
        const nbButtonsBeforeDelete = await ninthStratagemGroupComponentsPage.countDeleteButtons();
        await ninthStratagemGroupComponentsPage.clickOnLastDeleteButton();

        ninthStratagemGroupDeleteDialog = new NinthStratagemGroupDeleteDialog();
        expect(await ninthStratagemGroupDeleteDialog.getDialogTitle())
            .to.eq('n42cApp.ninthStratagemGroup.delete.question');
        await ninthStratagemGroupDeleteDialog.clickOnConfirmButton();

        expect(await ninthStratagemGroupComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
