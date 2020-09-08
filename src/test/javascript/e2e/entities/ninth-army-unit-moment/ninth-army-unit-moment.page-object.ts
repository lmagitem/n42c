import { element, by, ElementFinder } from 'protractor';

export class NinthArmyUnitMomentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ninth-army-unit-moment div table .btn-danger'));
  title = element.all(by.css('jhi-ninth-army-unit-moment div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class NinthArmyUnitMomentUpdatePage {
  pageTitle = element(by.id('jhi-ninth-army-unit-moment-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  currentInput = element(by.id('field_current'));
  sinceInstantInput = element(by.id('field_sinceInstant'));
  pointsCostInput = element(by.id('field_pointsCost'));
  powerRatingInput = element(by.id('field_powerRating'));
  experiencePointsInput = element(by.id('field_experiencePoints'));
  crusadePointsInput = element(by.id('field_crusadePoints'));
  equipmentInput = element(by.id('field_equipment'));
  psychicPowersInput = element(by.id('field_psychicPowers'));
  warlordTraitsInput = element(by.id('field_warlordTraits'));
  relicsInput = element(by.id('field_relics'));
  otherUpgradesInput = element(by.id('field_otherUpgrades'));
  battlesPlayedInput = element(by.id('field_battlesPlayed'));
  battlesSurvivedInput = element(by.id('field_battlesSurvived'));
  rangedKillsInput = element(by.id('field_rangedKills'));
  meleeKillsInput = element(by.id('field_meleeKills'));
  psychicKillsInput = element(by.id('field_psychicKills'));
  crusadeRankSelect = element(by.id('field_crusadeRank'));
  battleHonoursInput = element(by.id('field_battleHonours'));
  battleScarsInput = element(by.id('field_battleScars'));

  armyUnitSelect = element(by.id('field_armyUnit'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getCurrentInput(): ElementFinder {
    return this.currentInput;
  }

  async setSinceInstantInput(sinceInstant: string): Promise<void> {
    await this.sinceInstantInput.sendKeys(sinceInstant);
  }

  async getSinceInstantInput(): Promise<string> {
    return await this.sinceInstantInput.getAttribute('value');
  }

  async setPointsCostInput(pointsCost: string): Promise<void> {
    await this.pointsCostInput.sendKeys(pointsCost);
  }

  async getPointsCostInput(): Promise<string> {
    return await this.pointsCostInput.getAttribute('value');
  }

  async setPowerRatingInput(powerRating: string): Promise<void> {
    await this.powerRatingInput.sendKeys(powerRating);
  }

  async getPowerRatingInput(): Promise<string> {
    return await this.powerRatingInput.getAttribute('value');
  }

  async setExperiencePointsInput(experiencePoints: string): Promise<void> {
    await this.experiencePointsInput.sendKeys(experiencePoints);
  }

  async getExperiencePointsInput(): Promise<string> {
    return await this.experiencePointsInput.getAttribute('value');
  }

  async setCrusadePointsInput(crusadePoints: string): Promise<void> {
    await this.crusadePointsInput.sendKeys(crusadePoints);
  }

  async getCrusadePointsInput(): Promise<string> {
    return await this.crusadePointsInput.getAttribute('value');
  }

  async setEquipmentInput(equipment: string): Promise<void> {
    await this.equipmentInput.sendKeys(equipment);
  }

  async getEquipmentInput(): Promise<string> {
    return await this.equipmentInput.getAttribute('value');
  }

  async setPsychicPowersInput(psychicPowers: string): Promise<void> {
    await this.psychicPowersInput.sendKeys(psychicPowers);
  }

  async getPsychicPowersInput(): Promise<string> {
    return await this.psychicPowersInput.getAttribute('value');
  }

  async setWarlordTraitsInput(warlordTraits: string): Promise<void> {
    await this.warlordTraitsInput.sendKeys(warlordTraits);
  }

  async getWarlordTraitsInput(): Promise<string> {
    return await this.warlordTraitsInput.getAttribute('value');
  }

  async setRelicsInput(relics: string): Promise<void> {
    await this.relicsInput.sendKeys(relics);
  }

  async getRelicsInput(): Promise<string> {
    return await this.relicsInput.getAttribute('value');
  }

  async setOtherUpgradesInput(otherUpgrades: string): Promise<void> {
    await this.otherUpgradesInput.sendKeys(otherUpgrades);
  }

  async getOtherUpgradesInput(): Promise<string> {
    return await this.otherUpgradesInput.getAttribute('value');
  }

  async setBattlesPlayedInput(battlesPlayed: string): Promise<void> {
    await this.battlesPlayedInput.sendKeys(battlesPlayed);
  }

  async getBattlesPlayedInput(): Promise<string> {
    return await this.battlesPlayedInput.getAttribute('value');
  }

  async setBattlesSurvivedInput(battlesSurvived: string): Promise<void> {
    await this.battlesSurvivedInput.sendKeys(battlesSurvived);
  }

  async getBattlesSurvivedInput(): Promise<string> {
    return await this.battlesSurvivedInput.getAttribute('value');
  }

  async setRangedKillsInput(rangedKills: string): Promise<void> {
    await this.rangedKillsInput.sendKeys(rangedKills);
  }

  async getRangedKillsInput(): Promise<string> {
    return await this.rangedKillsInput.getAttribute('value');
  }

  async setMeleeKillsInput(meleeKills: string): Promise<void> {
    await this.meleeKillsInput.sendKeys(meleeKills);
  }

  async getMeleeKillsInput(): Promise<string> {
    return await this.meleeKillsInput.getAttribute('value');
  }

  async setPsychicKillsInput(psychicKills: string): Promise<void> {
    await this.psychicKillsInput.sendKeys(psychicKills);
  }

  async getPsychicKillsInput(): Promise<string> {
    return await this.psychicKillsInput.getAttribute('value');
  }

  async setCrusadeRankSelect(crusadeRank: string): Promise<void> {
    await this.crusadeRankSelect.sendKeys(crusadeRank);
  }

  async getCrusadeRankSelect(): Promise<string> {
    return await this.crusadeRankSelect.element(by.css('option:checked')).getText();
  }

  async crusadeRankSelectLastOption(): Promise<void> {
    await this.crusadeRankSelect.all(by.tagName('option')).last().click();
  }

  async setBattleHonoursInput(battleHonours: string): Promise<void> {
    await this.battleHonoursInput.sendKeys(battleHonours);
  }

  async getBattleHonoursInput(): Promise<string> {
    return await this.battleHonoursInput.getAttribute('value');
  }

  async setBattleScarsInput(battleScars: string): Promise<void> {
    await this.battleScarsInput.sendKeys(battleScars);
  }

  async getBattleScarsInput(): Promise<string> {
    return await this.battleScarsInput.getAttribute('value');
  }

  async armyUnitSelectLastOption(): Promise<void> {
    await this.armyUnitSelect.all(by.tagName('option')).last().click();
  }

  async armyUnitSelectOption(option: string): Promise<void> {
    await this.armyUnitSelect.sendKeys(option);
  }

  getArmyUnitSelect(): ElementFinder {
    return this.armyUnitSelect;
  }

  async getArmyUnitSelectedOption(): Promise<string> {
    return await this.armyUnitSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class NinthArmyUnitMomentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ninthArmyUnitMoment-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ninthArmyUnitMoment'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
