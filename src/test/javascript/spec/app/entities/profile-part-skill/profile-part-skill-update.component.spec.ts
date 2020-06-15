import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartSkillUpdateComponent } from 'app/entities/profile-part-skill/profile-part-skill-update.component';
import { ProfilePartSkillService } from 'app/entities/profile-part-skill/profile-part-skill.service';
import { ProfilePartSkill } from 'app/shared/model/profile-part-skill.model';

describe('Component Tests', () => {
  describe('ProfilePartSkill Management Update Component', () => {
    let comp: ProfilePartSkillUpdateComponent;
    let fixture: ComponentFixture<ProfilePartSkillUpdateComponent>;
    let service: ProfilePartSkillService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartSkillUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfilePartSkillUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartSkillUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartSkillService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfilePartSkill(123);
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
        const entity = new ProfilePartSkill();
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
