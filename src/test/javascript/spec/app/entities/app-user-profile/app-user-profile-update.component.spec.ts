import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { AppUserProfileUpdateComponent } from 'app/entities/app-user-profile/app-user-profile-update.component';
import { AppUserProfileService } from 'app/entities/app-user-profile/app-user-profile.service';
import { AppUserProfile } from 'app/shared/model/app-user-profile.model';

describe('Component Tests', () => {
  describe('AppUserProfile Management Update Component', () => {
    let comp: AppUserProfileUpdateComponent;
    let fixture: ComponentFixture<AppUserProfileUpdateComponent>;
    let service: AppUserProfileService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [AppUserProfileUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AppUserProfileUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AppUserProfileUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AppUserProfileService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AppUserProfile(123);
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
        const entity = new AppUserProfile();
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
