import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyUnitUpdateComponent } from 'app/entities/ninth-army-unit/ninth-army-unit-update.component';
import { NinthArmyUnitService } from 'app/entities/ninth-army-unit/ninth-army-unit.service';
import { NinthArmyUnit } from 'app/shared/model/ninth-army-unit.model';

describe('Component Tests', () => {
  describe('NinthArmyUnit Management Update Component', () => {
    let comp: NinthArmyUnitUpdateComponent;
    let fixture: ComponentFixture<NinthArmyUnitUpdateComponent>;
    let service: NinthArmyUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyUnitUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthArmyUnitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthArmyUnitUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthArmyUnitService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthArmyUnit(123);
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
        const entity = new NinthArmyUnit();
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
