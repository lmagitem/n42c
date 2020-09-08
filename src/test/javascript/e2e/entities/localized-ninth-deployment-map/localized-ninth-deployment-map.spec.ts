import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LocalizedNinthDeploymentMapComponentsPage,
  LocalizedNinthDeploymentMapDeleteDialog,
  LocalizedNinthDeploymentMapUpdatePage,
} from './localized-ninth-deployment-map.page-object';

const expect = chai.expect;

describe('LocalizedNinthDeploymentMap e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let localizedNinthDeploymentMapComponentsPage: LocalizedNinthDeploymentMapComponentsPage;
  let localizedNinthDeploymentMapUpdatePage: LocalizedNinthDeploymentMapUpdatePage;
  let localizedNinthDeploymentMapDeleteDialog: LocalizedNinthDeploymentMapDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LocalizedNinthDeploymentMaps', async () => {
    await navBarPage.goToEntity('localized-ninth-deployment-map');
    localizedNinthDeploymentMapComponentsPage = new LocalizedNinthDeploymentMapComponentsPage();
    await browser.wait(ec.visibilityOf(localizedNinthDeploymentMapComponentsPage.title), 5000);
    expect(await localizedNinthDeploymentMapComponentsPage.getTitle()).to.eq('n42CApp.localizedNinthDeploymentMap.home.title');
    await browser.wait(
      ec.or(
        ec.visibilityOf(localizedNinthDeploymentMapComponentsPage.entities),
        ec.visibilityOf(localizedNinthDeploymentMapComponentsPage.noResult)
      ),
      1000
    );
  });

  it('should load create LocalizedNinthDeploymentMap page', async () => {
    await localizedNinthDeploymentMapComponentsPage.clickOnCreateButton();
    localizedNinthDeploymentMapUpdatePage = new LocalizedNinthDeploymentMapUpdatePage();
    expect(await localizedNinthDeploymentMapUpdatePage.getPageTitle()).to.eq('n42CApp.localizedNinthDeploymentMap.home.createOrEditLabel');
    await localizedNinthDeploymentMapUpdatePage.cancel();
  });

  it('should create and save LocalizedNinthDeploymentMaps', async () => {
    const nbButtonsBeforeCreate = await localizedNinthDeploymentMapComponentsPage.countDeleteButtons();

    await localizedNinthDeploymentMapComponentsPage.clickOnCreateButton();

    await promise.all([
      localizedNinthDeploymentMapUpdatePage.setNameInput('name'),
      localizedNinthDeploymentMapUpdatePage.setDescriptionInput('description'),
      localizedNinthDeploymentMapUpdatePage.deploymentMapSelectLastOption(),
    ]);

    expect(await localizedNinthDeploymentMapUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await localizedNinthDeploymentMapUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );

    await localizedNinthDeploymentMapUpdatePage.save();
    expect(await localizedNinthDeploymentMapUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await localizedNinthDeploymentMapComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LocalizedNinthDeploymentMap', async () => {
    const nbButtonsBeforeDelete = await localizedNinthDeploymentMapComponentsPage.countDeleteButtons();
    await localizedNinthDeploymentMapComponentsPage.clickOnLastDeleteButton();

    localizedNinthDeploymentMapDeleteDialog = new LocalizedNinthDeploymentMapDeleteDialog();
    expect(await localizedNinthDeploymentMapDeleteDialog.getDialogTitle()).to.eq('n42CApp.localizedNinthDeploymentMap.delete.question');
    await localizedNinthDeploymentMapDeleteDialog.clickOnConfirmButton();

    expect(await localizedNinthDeploymentMapComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
