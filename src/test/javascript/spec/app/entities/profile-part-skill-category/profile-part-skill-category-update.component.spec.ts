import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartSkillCategoryUpdateComponent } from 'app/entities/profile-part-skill-category/profile-part-skill-category-update.component';
import { ProfilePartSkillCategoryService } from 'app/entities/profile-part-skill-category/profile-part-skill-category.service';
import { ProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';

describe('Component Tests', () => {
  describe('ProfilePartSkillCategory Management Update Component', () => {
    let comp: ProfilePartSkillCategoryUpdateComponent;
    let fixture: ComponentFixture<ProfilePartSkillCategoryUpdateComponent>;
    let service: ProfilePartSkillCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartSkillCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfilePartSkillCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartSkillCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartSkillCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfilePartSkillCategory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfilePartSkillCategory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
