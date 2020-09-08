import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthUnitUpdateComponent } from 'app/entities/ninth-unit/ninth-unit-update.component';
import { NinthUnitService } from 'app/entities/ninth-unit/ninth-unit.service';
import { NinthUnit } from 'app/shared/model/ninth-unit.model';

describe('Component Tests', () => {
  describe('NinthUnit Management Update Component', () => {
    let comp: NinthUnitUpdateComponent;
    let fixture: ComponentFixture<NinthUnitUpdateComponent>;
    let service: NinthUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthUnitUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthUnitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthUnitUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthUnitService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthUnit(123);
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
        const entity = new NinthUnit();
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
