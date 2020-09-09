import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INinthStratagemGroup, NinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';
import { NinthStratagemGroupService } from './ninth-stratagem-group.service';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';

@Component({
  selector: 'jhi-ninth-stratagem-group-update',
  templateUrl: './ninth-stratagem-group-update.component.html',
})
export class NinthStratagemGroupUpdateComponent implements OnInit {
  isSaving = false;
  players: IPlayer[] = [];

  editForm = this.fb.group({
    id: [],
    shareable: [],
    author: [],
  });

  constructor(
    protected ninthStratagemGroupService: NinthStratagemGroupService,
    protected playerService: PlayerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthStratagemGroup }) => {
      this.updateForm(ninthStratagemGroup);

      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));
    });
  }

  updateForm(ninthStratagemGroup: INinthStratagemGroup): void {
    this.editForm.patchValue({
      id: ninthStratagemGroup.id,
      shareable: ninthStratagemGroup.shareable,
      author: ninthStratagemGroup.author,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthStratagemGroup = this.createFromForm();
    if (ninthStratagemGroup.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthStratagemGroupService.update(ninthStratagemGroup));
    } else {
      this.subscribeToSaveResponse(this.ninthStratagemGroupService.create(ninthStratagemGroup));
    }
  }

  private createFromForm(): INinthStratagemGroup {
    return {
      ...new NinthStratagemGroup(),
      id: this.editForm.get(['id'])!.value,
      shareable: this.editForm.get(['shareable'])!.value,
      author: this.editForm.get(['author'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthStratagemGroup>>): void {
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

  trackById(index: number, item: IPlayer): any {
    return item.id;
  }
}
