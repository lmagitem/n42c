import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {IProfilePartSkill, ProfilePartSkill} from 'app/shared/model/profile-part-skill.model';
import {ProfilePartSkillService} from './profile-part-skill.service';
import {IProfilePartLinkedExperience} from 'app/shared/model/profile-part-linked-experience.model';
import {ProfilePartLinkedExperienceService} from 'app/entities/profile-part-linked-experience/profile-part-linked-experience.service';
import {IProfilePartSkillCategory} from 'app/shared/model/profile-part-skill-category.model';
import {ProfilePartSkillCategoryService} from 'app/entities/profile-part-skill-category/profile-part-skill-category.service';

type SelectableEntity = IProfilePartLinkedExperience | IProfilePartSkillCategory;

@Component({
  selector: 'jhi-profile-part-skill-update',
  templateUrl: './profile-part-skill-update.component.html',
})
export class ProfilePartSkillUpdateComponent implements OnInit {
  isSaving = false;
  profilepartlinkedexperiences: IProfilePartLinkedExperience[] = [];
  profilepartskillcategories: IProfilePartSkillCategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    index: [],
    level: [null, [Validators.required]],
    linkedSkills: [],
    skillCategory: [],
  });

  constructor(
    protected profilePartSkillService: ProfilePartSkillService,
    protected profilePartLinkedExperienceService: ProfilePartLinkedExperienceService,
    protected profilePartSkillCategoryService: ProfilePartSkillCategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilePartSkill }) => {
      this.updateForm(profilePartSkill);

      this.profilePartLinkedExperienceService
        .query()
        .subscribe((res: HttpResponse<IProfilePartLinkedExperience[]>) => (this.profilepartlinkedexperiences = res.body || []));

      this.profilePartSkillCategoryService
        .query()
        .subscribe((res: HttpResponse<IProfilePartSkillCategory[]>) => (this.profilepartskillcategories = res.body || []));
    });
  }

  updateForm(profilePartSkill: IProfilePartSkill): void {
    this.editForm.patchValue({
      id: profilePartSkill.id,
      name: profilePartSkill.name,
      index: profilePartSkill.index,
      level: profilePartSkill.level,
      linkedSkills: profilePartSkill.linkedSkills,
      skillCategory: profilePartSkill.skillCategory,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profilePartSkill = this.createFromForm();
    if (profilePartSkill.id !== undefined) {
      this.subscribeToSaveResponse(this.profilePartSkillService.update(profilePartSkill));
    } else {
      this.subscribeToSaveResponse(this.profilePartSkillService.create(profilePartSkill));
    }
  }

  private createFromForm(): IProfilePartSkill {
    return {
      ...new ProfilePartSkill(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      index: this.editForm.get(['index'])!.value,
      level: this.editForm.get(['level'])!.value,
      linkedSkills: this.editForm.get(['linkedSkills'])!.value,
      skillCategory: this.editForm.get(['skillCategory'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilePartSkill>>): void {
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

  getSelected(selectedVals: IProfilePartLinkedExperience[], option: IProfilePartLinkedExperience): IProfilePartLinkedExperience {
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
