import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  NinthDeploymentMapComponentsPage,
  NinthDeploymentMapDeleteDialog,
  NinthDeploymentMapUpdatePage,
} from './ninth-deployment-map.page-object';

const expect = chai.expect;

describe('NinthDeploymentMap e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ninthDeploymentMapComponentsPage: NinthDeploymentMapComponentsPage;
  let ninthDeploymentMapUpdatePage: NinthDeploymentMapUpdatePage;
  let ninthDeploymentMapDeleteDialog: NinthDeploymentMapDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load NinthDeploymentMaps', async () => {
    await navBarPage.goToEntity('ninth-deployment-map');
    ninthDeploymentMapComponentsPage = new NinthDeploymentMapComponentsPage();
    await browser.wait(ec.visibilityOf(ninthDeploymentMapComponentsPage.title), 5000);
    expect(await ninthDeploymentMapComponentsPage.getTitle()).to.eq('n42cApp.ninthDeploymentMap.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(ninthDeploymentMapComponentsPage.entities), ec.visibilityOf(ninthDeploymentMapComponentsPage.noResult)),
      1000
    );
  });

  it('should load create NinthDeploymentMap page', async () => {
    await ninthDeploymentMapComponentsPage.clickOnCreateButton();
    ninthDeploymentMapUpdatePage = new NinthDeploymentMapUpdatePage();
    expect(await ninthDeploymentMapUpdatePage.getPageTitle()).to.eq('n42cApp.ninthDeploymentMap.home.createOrEditLabel');
    await ninthDeploymentMapUpdatePage.cancel();
  });

  it('should create and save NinthDeploymentMaps', async () => {
    const nbButtonsBeforeCreate = await ninthDeploymentMapComponentsPage.countDeleteButtons();

    await ninthDeploymentMapComponentsPage.clickOnCreateButton();

    await promise.all([
      ninthDeploymentMapUpdatePage.setUrlInput('url'),
      // ninthDeploymentMapUpdatePage.usedInMissionsSelectLastOption(),
    ]);

    expect(await ninthDeploymentMapUpdatePage.getUrlInput()).to.eq('url', 'Expected Url value to be equals to url');
    const selectedShareable = ninthDeploymentMapUpdatePage.getShareableInput();
    if (await selectedShareable.isSelected()) {
      await ninthDeploymentMapUpdatePage.getShareableInput().click();
      expect(await ninthDeploymentMapUpdatePage.getShareableInput().isSelected(), 'Expected shareable not to be selected').to.be.false;
    } else {
      await ninthDeploymentMapUpdatePage.getShareableInput().click();
      expect(await ninthDeploymentMapUpdatePage.getShareableInput().isSelected(), 'Expected shareable to be selected').to.be.true;
    }

    await ninthDeploymentMapUpdatePage.save();
    expect(await ninthDeploymentMapUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ninthDeploymentMapComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last NinthDeploymentMap', async () => {
    const nbButtonsBeforeDelete = await ninthDeploymentMapComponentsPage.countDeleteButtons();
    await ninthDeploymentMapComponentsPage.clickOnLastDeleteButton();

    ninthDeploymentMapDeleteDialog = new NinthDeploymentMapDeleteDialog();
    expect(await ninthDeploymentMapDeleteDialog.getDialogTitle()).to.eq('n42cApp.ninthDeploymentMap.delete.question');
    await ninthDeploymentMapDeleteDialog.clickOnConfirmButton();

    expect(await ninthDeploymentMapComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
