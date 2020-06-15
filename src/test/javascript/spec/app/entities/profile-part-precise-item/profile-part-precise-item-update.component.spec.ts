import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartPreciseItemUpdateComponent } from 'app/entities/profile-part-precise-item/profile-part-precise-item-update.component';
import { ProfilePartPreciseItemService } from 'app/entities/profile-part-precise-item/profile-part-precise-item.service';
import { ProfilePartPreciseItem } from 'app/shared/model/profile-part-precise-item.model';

describe('Component Tests', () => {
  describe('ProfilePartPreciseItem Management Update Component', () => {
    let comp: ProfilePartPreciseItemUpdateComponent;
    let fixture: ComponentFixture<ProfilePartPreciseItemUpdateComponent>;
    let service: ProfilePartPreciseItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartPreciseItemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfilePartPreciseItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartPreciseItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartPreciseItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfilePartPreciseItem(123);
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
        const entity = new ProfilePartPreciseItem();
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
