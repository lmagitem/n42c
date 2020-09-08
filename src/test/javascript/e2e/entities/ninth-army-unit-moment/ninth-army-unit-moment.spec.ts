import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  NinthArmyUnitMomentComponentsPage,
  NinthArmyUnitMomentDeleteDialog,
  NinthArmyUnitMomentUpdatePage,
} from './ninth-army-unit-moment.page-object';

const expect = chai.expect;

describe('NinthArmyUnitMoment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthArmyUnitMomentComponentsPage: NinthArmyUnitMomentComponentsPage;
  let ninthArmyUnitMomentUpdatePage: NinthArmyUnitMomentUpdatePage;
  let ninthArmyUnitMomentDeleteDialog: NinthArmyUnitMomentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthArmyUnitMoments', async () => {
    await navBarPage.goToEntity('ninth-army-unit-moment');
    ninthArmyUnitMomentComponentsPage = new NinthArmyUnitMomentComponentsPage();
    await browser.wait(ec.visibilityOf(ninthArmyUnitMomentComponentsPage.title), 5000);
    expect(await ninthArmyUnitMomentComponentsPage.getTitle()).to.eq('n42CApp.ninthArmyUnitMoment.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthArmyUnitMomentComponentsPage.entities), ec.visibilityOf(ninthArmyUnitMomentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthArmyUnitMoment page', async () => {
    await ninthArmyUnitMomentComponentsPage.clickOnCreateButton();
    ninthArmyUnitMomentUpdatePage = new NinthArmyUnitMomentUpdatePage();
    expect(await ninthArmyUnitMomentUpdatePage.getPageTitle()).to.eq('n42CApp.ninthArmyUnitMoment.home.createOrEditLabel');
    await ninthArmyUnitMomentUpdatePage.cancel();
  });

  it('should create and save NinthArmyUnitMoments', async () => {
    const nbButtonsBeforeCreate = await ninthArmyUnitMomentComponentsPage.countDeleteButtons();

    await ninthArmyUnitMomentComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthArmyUnitMomentUpdatePage.setSinceInstantInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      ninthArmyUnitMomentUpdatePage.setPointsCostInput('5'),
      ninthArmyUnitMomentUpdatePage.setPowerRatingInput('5'),
      ninthArmyUnitMomentUpdatePage.setExperiencePointsInput('5'),
      ninthArmyUnitMomentUpdatePage.setCrusadePointsInput('5'),
      ninthArmyUnitMomentUpdatePage.setEquipmentInput('equipment'),
      ninthArmyUnitMomentUpdatePage.setPsychicPowersInput('psychicPowers'),
      ninthArmyUnitMomentUpdatePage.setWarlordTraitsInput('warlordTraits'),
      ninthArmyUnitMomentUpdatePage.setRelicsInput('relics'),
      ninthArmyUnitMomentUpdatePage.setOtherUpgradesInput('otherUpgrades'),
      ninthArmyUnitMomentUpdatePage.setBattlesPlayedInput('5'),
      ninthArmyUnitMomentUpdatePage.setBattlesSurvivedInput('5'),
      ninthArmyUnitMomentUpdatePage.setRangedKillsInput('5'),
      ninthArmyUnitMomentUpdatePage.setMeleeKillsInput('5'),
      ninthArmyUnitMomentUpdatePage.setPsychicKillsInput('5'),
      ninthArmyUnitMomentUpdatePage.crusadeRankSelectLastOption(),
      ninthArmyUnitMomentUpdatePage.setBattleHonoursInput('battleHonours'),
      ninthArmyUnitMomentUpdatePage.setBattleScarsInput('battleScars'),
      ninthArmyUnitMomentUpdatePage.armyUnitSelectLastOption(),
    ]);

    const selectedCurrent = ninthArmyUnitMomentUpdatePage.getCurrentInput();
    if (await selectedCurrent.isSelected()) {
      await ninthArmyUnitMomentUpdatePage.getCurrentInput().click();
      expect(await ninthArmyUnitMomentUpdatePage.getCurrentInput().isSelected(), 'Expected current not to be selected').to.be.false;
    } else {
      await ninthArmyUnitMomentUpdatePage.getCurrentInput().click();
      expect(await ninthArmyUnitMomentUpdatePage.getCurrentInput().isSelected(), 'Expected current to be selected').to.be.true;
    }
    expect(await ninthArmyUnitMomentUpdatePage.getSinceInstantInput()).to.contain(
      '2001-01-01T02:30',
      'Expected sinceInstant value to be equals to 2000-12-31'
    );
    expect(await ninthArmyUnitMomentUpdatePage.getPointsCostInput()).to.eq('5', 'Expected pointsCost value to be equals to 5');
    expect(await ninthArmyUnitMomentUpdatePage.getPowerRatingInput()).to.eq('5', 'Expected powerRating value to be equals to 5');
    expect(await ninthArmyUnitMomentUpdatePage.getExperiencePointsInput()).to.eq('5', 'Expected experiencePoints value to be equals to 5');
    expect(await ninthArmyUnitMomentUpdatePage.getCrusadePointsInput()).to.eq('5', 'Expected crusadePoints value to be equals to 5');
    expect(await ninthArmyUnitMomentUpdatePage.getEquipmentInput()).to.eq(
      'equipment',
      'Expected Equipment value to be equals to equipment'
    );
    expect(await ninthArmyUnitMomentUpdatePage.getPsychicPowersInput()).to.eq(
      'psychicPowers',
      'Expected PsychicPowers value to be equals to psychicPowers'
    );
    expect(await ninthArmyUnitMomentUpdatePage.getWarlordTraitsInput()).to.eq(
      'warlordTraits',
      'Expected WarlordTraits value to be equals to warlordTraits'
    );
    expect(await ninthArmyUnitMomentUpdatePage.getRelicsInput()).to.eq('relics', 'Expected Relics value to be equals to relics');
    expect(await ninthArmyUnitMomentUpdatePage.getOtherUpgradesInput()).to.eq(
      'otherUpgrades',
      'Expected OtherUpgrades value to be equals to otherUpgrades'
    );
    expect(await ninthArmyUnitMomentUpdatePage.getBattlesPlayedInput()).to.eq('5', 'Expected battlesPlayed value to be equals to 5');
    expect(await ninthArmyUnitMomentUpdatePage.getBattlesSurvivedInput()).to.eq('5', 'Expected battlesSurvived value to be equals to 5');
    expect(await ninthArmyUnitMomentUpdatePage.getRangedKillsInput()).to.eq('5', 'Expected rangedKills value to be equals to 5');
    expect(await ninthArmyUnitMomentUpdatePage.getMeleeKillsInput()).to.eq('5', 'Expected meleeKills value to be equals to 5');
    expect(await ninthArmyUnitMomentUpdatePage.getPsychicKillsInput()).to.eq('5', 'Expected psychicKills value to be equals to 5');
    expect(await ninthArmyUnitMomentUpdatePage.getBattleHonoursInput()).to.eq(
      'battleHonours',
      'Expected BattleHonours value to be equals to battleHonours'
    );
    expect(await ninthArmyUnitMomentUpdatePage.getBattleScarsInput()).to.eq(
      'battleScars',
      'Expected BattleScars value to be equals to battleScars'
    );

    await ninthArmyUnitMomentUpdatePage.save();
    expect(await ninthArmyUnitMomentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthArmyUnitMomentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NinthArmyUnitMoment', async () => {
    const nbButtonsBeforeDelete = await ninthArmyUnitMomentComponentsPage.countDeleteButtons();
    await ninthArmyUnitMomentComponentsPage.clickOnLastDeleteButton();

    ninthArmyUnitMomentDeleteDialog = new NinthArmyUnitMomentDeleteDialog();
    expect(await ninthArmyUnitMomentDeleteDialog.getDialogTitle()).to.eq('n42CApp.ninthArmyUnitMoment.delete.question');
    await ninthArmyUnitMomentDeleteDialog.clickOnConfirmButton();

    expect(await ninthArmyUnitMomentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
