import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartSimpleItemUpdateComponent } from 'app/entities/profile-part-simple-item/profile-part-simple-item-update.component';
import { ProfilePartSimpleItemService } from 'app/entities/profile-part-simple-item/profile-part-simple-item.service';
import { ProfilePartSimpleItem } from 'app/shared/model/profile-part-simple-item.model';

describe('Component Tests', () => {
  describe('ProfilePartSimpleItem Management Update Component', () => {
    let comp: ProfilePartSimpleItemUpdateComponent;
    let fixture: ComponentFixture<ProfilePartSimpleItemUpdateComponent>;
    let service: ProfilePartSimpleItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartSimpleItemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfilePartSimpleItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfilePartSimpleItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfilePartSimpleItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfilePartSimpleItem(123);
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
        const entity = new ProfilePartSimpleItem();
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
