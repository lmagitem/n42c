import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from 'app/core/user/user.model';
import {AppUser, IAppUser} from 'app/shared/model/app-user.model';
import {FormBuilder, Validators} from '@angular/forms';
import {AppUserService} from 'app/entities/app-user/app-user.service';
import {UserService} from 'app/core/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from 'app/core/auth/account.service';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {SubSink} from 'subsink';
import {AppUserRights} from "app/shared/model/enumerations/app-user-rights.model";

type SelectableEntity = IUser | IAppUser;

@Component({
  selector: 'jhi-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, OnDestroy {
  subs = new SubSink();
  isSaving = false;
  users: IUser[] = [];
  appusers: IAppUser[] = [];
  rights: AppUserRights[] = [
    AppUserRights.MOD,
    AppUserRights.WRI,
    AppUserRights.REA
  ]

  editForm = this.fb.group({
    id: [],
    userName: [null, [Validators.required]],
    displayedName: [null, []],
    admin: [null, [Validators.required]],
    shopRights: [null, [Validators.required]],
    blogRights: [null, [Validators.required]],
    profileRights: [null, [Validators.required]],
    scriptoriumRights: [null, [Validators.required]],
    user: [],
    givenFriendships: [],
    askedFriendRequests: [],
  });

  constructor(
    protected appUserService: AppUserService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.subs.sink = this.accountService
      .identity()
      .pipe(
        filter(identity => identity != null),
        map(identity => (identity != null ? identity.appUser : {}))
      )
      .subscribe(appUser => {
        this.updateForm(appUser);
        this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
        this.appUserService.query().subscribe((res: HttpResponse<IAppUser[]>) => (this.appusers = res.body || []));
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  updateForm(appUser: IAppUser): void {
    this.editForm.patchValue({
      id: appUser.id,
      userName: appUser.userName,
      displayedName: appUser.displayedName,
      admin: appUser.admin,
      shopRights: appUser.shopRights,
      blogRights: appUser.blogRights,
      profileRights: appUser.profileRights,
      scriptoriumRights: appUser.scriptoriumRights,
      user: appUser.user,
      givenFriendships: appUser.givenFriendships,
      askedFriendRequests: appUser.askedFriendRequests,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const appUser = this.createFromForm();
    if (appUser.id !== undefined) {
      this.subscribeToSaveResponse(this.appUserService.update(appUser));
    } else {
      this.subscribeToSaveResponse(this.appUserService.create(appUser));
    }
  }

  private createFromForm(): IAppUser {
    return {
      ...new AppUser(),
      id: this.editForm.get(['id'])!.value,
      userName: this.editForm.get(['userName'])!.value,
      displayedName: this.editForm.get(['displayedName'])!.value,
      admin: this.editForm.get(['admin'])!.value,
      shopRights: this.editForm.get(['shopRights'])!.value,
      blogRights: this.editForm.get(['blogRights'])!.value,
      profileRights: this.editForm.get(['profileRights'])!.value,
      scriptoriumRights: this.editForm.get(['scriptoriumRights'])!.value,
      user: this.editForm.get(['user'])!.value,
      givenFriendships: this.editForm.get(['givenFriendships'])!.value,
      askedFriendRequests: this.editForm.get(['askedFriendRequests'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppUser>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();

    // Update the stored appUser
    this.accountService.identity(true);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IAppUser[], option: IAppUser): IAppUser {
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
