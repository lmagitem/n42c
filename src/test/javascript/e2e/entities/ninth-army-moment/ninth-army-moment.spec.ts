import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NinthArmyMomentComponentsPage, NinthArmyMomentDeleteDialog, NinthArmyMomentUpdatePage } from './ninth-army-moment.page-object';

const expect = chai.expect;

describe('NinthArmyMoment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthArmyMomentComponentsPage: NinthArmyMomentComponentsPage;
  let ninthArmyMomentUpdatePage: NinthArmyMomentUpdatePage;
  let ninthArmyMomentDeleteDialog: NinthArmyMomentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthArmyMoments', async () => {
    await navBarPage.goToEntity('ninth-army-moment');
    ninthArmyMomentComponentsPage = new NinthArmyMomentComponentsPage();
    await browser.wait(ec.visibilityOf(ninthArmyMomentComponentsPage.title), 5000);
    expect(await ninthArmyMomentComponentsPage.getTitle()).to.eq('n42cApp.ninthArmyMoment.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthArmyMomentComponentsPage.entities), ec.visibilityOf(ninthArmyMomentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthArmyMoment page', async () => {
    await ninthArmyMomentComponentsPage.clickOnCreateButton();
    ninthArmyMomentUpdatePage = new NinthArmyMomentUpdatePage();
    expect(await ninthArmyMomentUpdatePage.getPageTitle()).to.eq('n42cApp.ninthArmyMoment.home.createOrEditLabel');
    await ninthArmyMomentUpdatePage.cancel();
  });

  it('should create and save NinthArmyMoments', async () => {
    const nbButtonsBeforeCreate = await ninthArmyMomentComponentsPage.countDeleteButtons();

    await ninthArmyMomentComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthArmyMomentUpdatePage.setSinceInstantInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      ninthArmyMomentUpdatePage.setMajorVictoriesInput('5'),
      ninthArmyMomentUpdatePage.setMinorVictoriesInput('5'),
      ninthArmyMomentUpdatePage.setDrawsInput('5'),
      ninthArmyMomentUpdatePage.setMinorDefeatsInput('5'),
      ninthArmyMomentUpdatePage.setMajorDefeatsInput('5'),
      ninthArmyMomentUpdatePage.setRequisitionInput('5'),
      ninthArmyMomentUpdatePage.setSupplyLimitInput('5'),
      ninthArmyMomentUpdatePage.setSupplyUsedInput('5'),
      ninthArmyMomentUpdatePage.setObjectivesInput('objectives'),
      ninthArmyMomentUpdatePage.setNotesInput('notes'),
      // ninthArmyMomentUpdatePage.selectedUnitsSelectLastOption(),
      // ninthArmyMomentUpdatePage.selectedObjectivesSelectLastOption(),
      ninthArmyMomentUpdatePage.battleSelectLastOption(),
      ninthArmyMomentUpdatePage.armySelectLastOption(),
    ]);

    const selectedCurrent = ninthArmyMomentUpdatePage.getCurrentInput();
    if (await selectedCurrent.isSelected()) {
      await ninthArmyMomentUpdatePage.getCurrentInput().click();
      expect(await ninthArmyMomentUpdatePage.getCurrentInput().isSelected(), 'Expected current not to be selected').to.be.false;
    } else {
      await ninthArmyMomentUpdatePage.getCurrentInput().click();
      expect(await ninthArmyMomentUpdatePage.getCurrentInput().isSelected(), 'Expected current to be selected').to.be.true;
    }
    expect(await ninthArmyMomentUpdatePage.getSinceInstantInput()).to.contain(
      '2001-01-01T02:30',
      'Expected sinceInstant value to be equals to 2000-12-31'
    );
    expect(await ninthArmyMomentUpdatePage.getMajorVictoriesInput()).to.eq('5', 'Expected majorVictories value to be equals to 5');
    expect(await ninthArmyMomentUpdatePage.getMinorVictoriesInput()).to.eq('5', 'Expected minorVictories value to be equals to 5');
    expect(await ninthArmyMomentUpdatePage.getDrawsInput()).to.eq('5', 'Expected draws value to be equals to 5');
    expect(await ninthArmyMomentUpdatePage.getMinorDefeatsInput()).to.eq('5', 'Expected minorDefeats value to be equals to 5');
    expect(await ninthArmyMomentUpdatePage.getMajorDefeatsInput()).to.eq('5', 'Expected majorDefeats value to be equals to 5');
    expect(await ninthArmyMomentUpdatePage.getRequisitionInput()).to.eq('5', 'Expected requisition value to be equals to 5');
    expect(await ninthArmyMomentUpdatePage.getSupplyLimitInput()).to.eq('5', 'Expected supplyLimit value to be equals to 5');
    expect(await ninthArmyMomentUpdatePage.getSupplyUsedInput()).to.eq('5', 'Expected supplyUsed value to be equals to 5');
    expect(await ninthArmyMomentUpdatePage.getObjectivesInput()).to.eq(
      'objectives',
      'Expected Objectives value to be equals to objectives'
    );
    expect(await ninthArmyMomentUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');

    await ninthArmyMomentUpdatePage.save();
    expect(await ninthArmyMomentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthArmyMomentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NinthArmyMoment', async () => {
    const nbButtonsBeforeDelete = await ninthArmyMomentComponentsPage.countDeleteButtons();
    await ninthArmyMomentComponentsPage.clickOnLastDeleteButton();

    ninthArmyMomentDeleteDialog = new NinthArmyMomentDeleteDialog();
    expect(await ninthArmyMomentDeleteDialog.getDialogTitle()).to.eq('n42cApp.ninthArmyMoment.delete.question');
    await ninthArmyMomentDeleteDialog.clickOnConfirmButton();

    expect(await ninthArmyMomentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
