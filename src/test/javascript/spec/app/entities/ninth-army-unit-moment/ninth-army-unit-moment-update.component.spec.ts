import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyUnitMomentUpdateComponent } from 'app/entities/ninth-army-unit-moment/ninth-army-unit-moment-update.component';
import { NinthArmyUnitMomentService } from 'app/entities/ninth-army-unit-moment/ninth-army-unit-moment.service';
import { NinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';

describe('Component Tests', () => {
  describe('NinthArmyUnitMoment Management Update Component', () => {
    let comp: NinthArmyUnitMomentUpdateComponent;
    let fixture: ComponentFixture<NinthArmyUnitMomentUpdateComponent>;
    let service: NinthArmyUnitMomentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyUnitMomentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthArmyUnitMomentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthArmyUnitMomentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthArmyUnitMomentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthArmyUnitMoment(123);
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
        const entity = new NinthArmyUnitMoment();
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
