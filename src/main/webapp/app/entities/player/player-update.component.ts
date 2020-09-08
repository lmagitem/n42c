import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPlayer, Player } from 'app/shared/model/player.model';
import { PlayerService } from './player.service';
import { IAppUser } from 'app/shared/model/app-user.model';
import { AppUserService } from 'app/entities/app-user/app-user.service';

@Component({
  selector: 'jhi-player-update',
  templateUrl: './player-update.component.html',
})
export class PlayerUpdateComponent implements OnInit {
  isSaving = false;
  appusers: IAppUser[] = [];

  editForm = this.fb.group({
    id: [],
    appUser: [],
  });

  constructor(
    protected playerService: PlayerService,
    protected appUserService: AppUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ player }) => {
      this.updateForm(player);

      this.appUserService
        .query({ filter: 'player-is-null' })
        .pipe(
          map((res: HttpResponse<IAppUser[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAppUser[]) => {
          if (!player.appUser || !player.appUser.id) {
            this.appusers = resBody;
          } else {
            this.appUserService
              .find(player.appUser.id)
              .pipe(
                map((subRes: HttpResponse<IAppUser>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAppUser[]) => (this.appusers = concatRes));
          }
        });
    });
  }

  updateForm(player: IPlayer): void {
    this.editForm.patchValue({
      id: player.id,
      appUser: player.appUser,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const player = this.createFromForm();
    if (player.id !== undefined) {
      this.subscribeToSaveResponse(this.playerService.update(player));
    } else {
      this.subscribeToSaveResponse(this.playerService.create(player));
    }
  }

  private createFromForm(): IPlayer {
    return {
      ...new Player(),
      id: this.editForm.get(['id'])!.value,
      appUser: this.editForm.get(['appUser'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayer>>): void {
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

  trackById(index: number, item: IAppUser): any {
    return item.id;
  }
}
