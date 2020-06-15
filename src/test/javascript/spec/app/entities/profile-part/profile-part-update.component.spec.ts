import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartUpdateComponent } from 'app/entities/profile-part/profile-part-update.component';
import { ProfilePartService } from 'app/entities/profile-part/profile-part.service';
import { ProfilePart } from 'app/shared/model/profile-part.model';

describe('Component Tests', () => {
  describe('ProfilePart Management Update Component', () => {
    let comp: ProfilePartUpdateComponent;
    let fixture: ComponentFixture<ProfilePartUpdateComponent>;
    let service: ProfilePartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfilePartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfilePart(123);
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
        const entity = new ProfilePart();
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
