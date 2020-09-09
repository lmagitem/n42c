import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NinthUnitMomentComponentsPage, NinthUnitMomentDeleteDialog, NinthUnitMomentUpdatePage } from './ninth-unit-moment.page-object';

const expect = chai.expect;

describe('NinthUnitMoment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthUnitMomentComponentsPage: NinthUnitMomentComponentsPage;
  let ninthUnitMomentUpdatePage: NinthUnitMomentUpdatePage;
  let ninthUnitMomentDeleteDialog: NinthUnitMomentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthUnitMoments', async () => {
    await navBarPage.goToEntity('ninth-unit-moment');
    ninthUnitMomentComponentsPage = new NinthUnitMomentComponentsPage();
    await browser.wait(ec.visibilityOf(ninthUnitMomentComponentsPage.title), 5000);
    expect(await ninthUnitMomentComponentsPage.getTitle()).to.eq('n42CApp.ninthUnitMoment.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthUnitMomentComponentsPage.entities), ec.visibilityOf(ninthUnitMomentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthUnitMoment page', async () => {
    await ninthUnitMomentComponentsPage.clickOnCreateButton();
    ninthUnitMomentUpdatePage = new NinthUnitMomentUpdatePage();
    expect(await ninthUnitMomentUpdatePage.getPageTitle()).to.eq('n42CApp.ninthUnitMoment.home.createOrEditLabel');
    await ninthUnitMomentUpdatePage.cancel();
  });

  it('should create and save NinthUnitMoments', async () => {
    const nbButtonsBeforeCreate = await ninthUnitMomentComponentsPage.countDeleteButtons();

    await ninthUnitMomentComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthUnitMomentUpdatePage.setSinceInstantInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      ninthUnitMomentUpdatePage.setPictureUrlInput('pictureUrl'),
      ninthUnitMomentUpdatePage.unitSelectLastOption(),
    ]);

    const selectedCurrent = ninthUnitMomentUpdatePage.getCurrentInput();
    if (await selectedCurrent.isSelected()) {
      await ninthUnitMomentUpdatePage.getCurrentInput().click();
      expect(await ninthUnitMomentUpdatePage.getCurrentInput().isSelected(), 'Expected current not to be selected').to.be.false;
    } else {
      await ninthUnitMomentUpdatePage.getCurrentInput().click();
      expect(await ninthUnitMomentUpdatePage.getCurrentInput().isSelected(), 'Expected current to be selected').to.be.true;
    }
    expect(await ninthUnitMomentUpdatePage.getSinceInstantInput()).to.contain(
      '2001-01-01T02:30',
      'Expected sinceInstant value to be equals to 2000-12-31'
    );
    expect(await ninthUnitMomentUpdatePage.getPictureUrlInput()).to.eq(
      'pictureUrl',
      'Expected PictureUrl value to be equals to pictureUrl'
    );

    await ninthUnitMomentUpdatePage.save();
    expect(await ninthUnitMomentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthUnitMomentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NinthUnitMoment', async () => {
    const nbButtonsBeforeDelete = await ninthUnitMomentComponentsPage.countDeleteButtons();
    await ninthUnitMomentComponentsPage.clickOnLastDeleteButton();

    ninthUnitMomentDeleteDialog = new NinthUnitMomentDeleteDialog();
    expect(await ninthUnitMomentDeleteDialog.getDialogTitle()).to.eq('n42CApp.ninthUnitMoment.delete.question');
    await ninthUnitMomentDeleteDialog.clickOnConfirmButton();

    expect(await ninthUnitMomentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
