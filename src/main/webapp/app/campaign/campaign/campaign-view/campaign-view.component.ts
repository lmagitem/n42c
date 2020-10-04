import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { INinthCampaign, NinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';
import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthStratagemGroupService } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';
import { NinthGameType } from 'app/shared/model/enumerations/ninth-game-type.model';
import { TranslationUtils } from 'app/shared/util/translation-utils';
import { NinthCampaignMomentService } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.service';
import { first } from 'rxjs/operators';
import { CampaignService } from 'app/campaign/campaign.service';

type SelectableEntity = IPlayer | INinthStratagemGroup;

@Component({
  selector: 'jhi-ninth-campaign-update',
  templateUrl: './campaign-view.component.html',
  styleUrls: ['./campaign-view.component.scss'],
})
export class CampaignViewComponent implements OnInit {
  isEditing = false;
  isEditingMoment = false;
  isSaving = false;
  players: IPlayer[] = [];
  ninthstratagemgroups: INinthStratagemGroup[] = [];
  selectedMomentId = -1;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    gameType: [null, [Validators.required]],
    usePowerRating: [null, [Validators.required]],
    authors: [],
    participants: [],
    campaignStratagems: [],
    description: [],
  });

  constructor(
    protected ninthCampaignService: NinthCampaignService,
    protected ninthCampaignMomentService: NinthCampaignMomentService,
    protected playerService: PlayerService,
    protected ninthStratagemGroupService: NinthStratagemGroupService,
    protected activatedRoute: ActivatedRoute,
    private campaignService: CampaignService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get the current campaign and everything that it needs
    this.campaignService.selectedCampaign$.subscribe(ninthCampaign => {
      this.updateForm(ninthCampaign);
      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));
      this.ninthStratagemGroupService
        .query()
        .subscribe((res: HttpResponse<INinthStratagemGroup[]>) => (this.ninthstratagemgroups = res.body || []));
    });

    // Update the editing status
    this.campaignService.currentlyEditingCampaign$.subscribe(status => (this.isEditing = status));
    this.campaignService.currentlyEditingCampaignMoment$.subscribe(status => {
      this.isEditingMoment = status;
      this.navigateToMomentRoute();
    });

    // Update the selected CampaignMoment id
    this.campaignService.selectedCampaignMomentId$.subscribe(id => {
      this.selectedMomentId = id;
      this.navigateToMomentRoute();
    });
  }

  /** If the CampaignMoment editing status changes, navigate to the proper route */
  private navigateToMomentRoute(): void {
    if (this.selectedMomentId === -1) {
      this.router.navigate(['moment', 'new'], {
        relativeTo: this.activatedRoute,
      });
    } else {
      if (this.isEditingMoment) {
        this.router.navigate(['moment', this.selectedMomentId, 'view'], {
          relativeTo: this.activatedRoute,
        });
      } else {
        this.router.navigate(['moment', this.selectedMomentId, 'edit'], {
          relativeTo: this.activatedRoute,
        });
      }
    }
  }

  updateForm(ninthCampaign: INinthCampaign): void {
    this.editForm.patchValue({
      id: ninthCampaign.id,
      name: ninthCampaign.name,
      gameType: ninthCampaign.gameType,
      usePowerRating: ninthCampaign.usePowerRating,
      authors: ninthCampaign.authors,
      participants: ninthCampaign.participants,
      campaignStratagems: ninthCampaign.campaignStratagems,
      description: ninthCampaign.description,
    });
  }

  getGameTypeTranslationPath(type: NinthGameType | string): string {
    return TranslationUtils.getGameTypeTranslationPath(type);
  }

  previousState(): void {
    window.history.back();
  }

  previous(): void {
    this.campaignService.selectPreviousCampaignMoment();
  }

  next(): void {
    this.campaignService.selectNextCampaignMoment();
  }

  edit(): void {
    this.campaignService.setCampaignEditingStatus(true);
  }

  editMoment(): void {
    this.campaignService.setCampaignMomentEditingStatus(true);
  }

  cancel(): void {
    this.campaignService.setCampaignEditingStatus(false);
  }

  save(): void {
    this.isSaving = true;
    const ninthCampaign = this.createFromForm();
    if (ninthCampaign.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthCampaignService.update(ninthCampaign));
    } else {
      this.subscribeToSaveResponse(this.ninthCampaignService.create(ninthCampaign));
    }
  }

  createMoment(): void {
    this.campaignService.addNewCampaignMoment();
  }

  private createFromForm(): INinthCampaign {
    return {
      ...new NinthCampaign(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      gameType: this.editForm.get(['gameType'])!.value,
      usePowerRating: this.editForm.get(['usePowerRating'])!.value,
      authors: this.editForm.get(['authors'])!.value,
      participants: this.editForm.get(['participants'])!.value,
      campaignStratagems: this.editForm.get(['campaignStratagems'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.campaignService.setCampaignEditingStatus(false);
  }

  protected onSaveError(): void {
    this.isSaving = false;
    this.campaignService.setCampaignEditingStatus(false);
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: SelectableEntity[], option: SelectableEntity): SelectableEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
