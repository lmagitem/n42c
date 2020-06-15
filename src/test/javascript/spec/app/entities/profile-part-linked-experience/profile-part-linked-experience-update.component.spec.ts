import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartLinkedExperienceUpdateComponent } from 'app/entities/profile-part-linked-experience/profile-part-linked-experience-update.component';
import { ProfilePartLinkedExperienceService } from 'app/entities/profile-part-linked-experience/profile-part-linked-experience.service';
import { ProfilePartLinkedExperience } from 'app/shared/model/profile-part-linked-experience.model';

describe('Component Tests', () => {
  describe('ProfilePartLinkedExperience Management Update Component', () => {
    let comp: ProfilePartLinkedExperienceUpdateComponent;
    let fixture: ComponentFixture<ProfilePartLinkedExperienceUpdateComponent>;
    let service: ProfilePartLinkedExperienceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartLinkedExperienceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfilePartLinkedExperienceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartLinkedExperienceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartLinkedExperienceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfilePartLinkedExperience(123);
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
        const entity = new ProfilePartLinkedExperience();
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
