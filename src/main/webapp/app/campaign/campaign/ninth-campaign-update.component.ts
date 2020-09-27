import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { INinthCampaign, NinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';
import { INinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthStratagemGroupService } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';

type SelectableEntity = IPlayer | INinthStratagemGroup;

@Component({
  selector: 'jhi-ninth-campaign-update',
  templateUrl: './ninth-campaign-update.component.html',
})
export class NinthCampaignUpdateComponent implements OnInit {
  isSaving = false;
  players: IPlayer[] = [];
  ninthstratagemgroups: INinthStratagemGroup[] = [];

  editForm = this.fb.group({
    id: [],
    gameType: [null, [Validators.required]],
    usePowerRating: [null, [Validators.required]],
    authors: [],
    participants: [],
    campaignStratagems: [],
  });

  constructor(
    protected ninthCampaignService: NinthCampaignService,
    protected playerService: PlayerService,
    protected ninthStratagemGroupService: NinthStratagemGroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthCampaign }) => {
      this.updateForm(ninthCampaign);

      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));

      this.ninthStratagemGroupService
        .query()
        .subscribe((res: HttpResponse<INinthStratagemGroup[]>) => (this.ninthstratagemgroups = res.body || []));
    });
  }

  updateForm(ninthCampaign: INinthCampaign): void {
    this.editForm.patchValue({
      id: ninthCampaign.id,
      gameType: ninthCampaign.gameType,
      usePowerRating: ninthCampaign.usePowerRating,
      authors: ninthCampaign.authors,
      participants: ninthCampaign.participants,
      campaignStratagems: ninthCampaign.campaignStratagems,
    });
  }

  previousState(): void {
    window.history.back();
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

  private createFromForm(): INinthCampaign {
    return {
      ...new NinthCampaign(),
      id: this.editForm.get(['id'])!.value,
      gameType: this.editForm.get(['gameType'])!.value,
      usePowerRating: this.editForm.get(['usePowerRating'])!.value,
      authors: this.editForm.get(['authors'])!.value,
      participants: this.editForm.get(['participants'])!.value,
      campaignStratagems: this.editForm.get(['campaignStratagems'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthCampaign>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
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
