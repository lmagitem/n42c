import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProfilePartSkillCategory, ProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';
import { ProfilePartSkillCategoryService } from './profile-part-skill-category.service';
import { IProfilePart } from 'app/shared/model/profile-part.model';
import { ProfilePartService } from 'app/entities/profile-part/profile-part.service';

@Component({
  selector: 'jhi-profile-part-skill-category-update',
  templateUrl: './profile-part-skill-category-update.component.html',
})
export class ProfilePartSkillCategoryUpdateComponent implements OnInit {
  isSaving = false;
  profileparts: IProfilePart[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    index: [],
    profilePart: [],
  });

  constructor(
    protected profilePartSkillCategoryService: ProfilePartSkillCategoryService,
    protected profilePartService: ProfilePartService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartSkillCategory }) => {
      this.updateForm(profilePartSkillCategory);

      this.profilePartService.query().subscribe((res: HttpResponse<IProfilePart[]>) => (this.profileparts = res.body || []));
    });
  }

  updateForm(profilePartSkillCategory: IProfilePartSkillCategory): void {
    this.editForm.patchValue({
      id: profilePartSkillCategory.id,
      name: profilePartSkillCategory.name,
      index: profilePartSkillCategory.index,
      profilePart: profilePartSkillCategory.profilePart,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profilePartSkillCategory = this.createFromForm();
    if (profilePartSkillCategory.id !== undefined) {
      this.subscribeToSaveResponse(this.profilePartSkillCategoryService.update(profilePartSkillCategory));
    } else {
      this.subscribeToSaveResponse(this.profilePartSkillCategoryService.create(profilePartSkillCategory));
    }
  }

  private createFromForm(): IProfilePartSkillCategory {
    return {
      ...new ProfilePartSkillCategory(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      index: this.editForm.get(['index'])!.value,
      profilePart: this.editForm.get(['profilePart'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilePartSkillCategory>>): void {
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

  trackById(index: number, item: IProfilePart): any {
    return item.id;
  }
}
