import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {INinthArmy, NinthArmy} from 'app/shared/model/ninth-army.model';
import {NinthArmyService} from './ninth-army.service';
import {IPlayer} from 'app/shared/model/player.model';
import {PlayerService} from 'app/entities/player/player.service';

@Component({
  selector: 'jhi-ninth-army-update',
  templateUrl: './ninth-army-update.component.html',
})
export class NinthArmyUpdateComponent implements OnInit {
  isSaving = false;
  players: IPlayer[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    crusade: [null, [Validators.required]],
    faction: [],
    subfaction: [],
    author: [null, Validators.required],
  });

  constructor(
    protected ninthArmyService: NinthArmyService,
    protected playerService: PlayerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ninthArmy}) => {
      this.updateForm(ninthArmy);

      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));
    });
  }

  updateForm(ninthArmy: INinthArmy): void {
    this.editForm.patchValue({
      id: ninthArmy.id,
      name: ninthArmy.name,
      crusade: ninthArmy.crusade,
      faction: ninthArmy.faction,
      subfaction: ninthArmy.subfaction,
      author: ninthArmy.author,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthArmy = this.createFromForm();
    if (ninthArmy.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthArmyService.update(ninthArmy));
    } else {
      this.subscribeToSaveResponse(this.ninthArmyService.create(ninthArmy));
    }
  }

  trackById(index: number, item: IPlayer): any {
    return item.id;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthArmy>>): void {
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

  private createFromForm(): INinthArmy {
    return {
      ...new NinthArmy(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      crusade: this.editForm.get(['crusade'])!.value,
      faction: this.editForm.get(['faction'])!.value,
      subfaction: this.editForm.get(['subfaction'])!.value,
      author: this.editForm.get(['author'])!.value,
    };
  }
}
