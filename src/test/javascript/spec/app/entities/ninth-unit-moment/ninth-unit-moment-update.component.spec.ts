import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthUnitMomentUpdateComponent } from 'app/entities/ninth-unit-moment/ninth-unit-moment-update.component';
import { NinthUnitMomentService } from 'app/entities/ninth-unit-moment/ninth-unit-moment.service';
import { NinthUnitMoment } from 'app/shared/model/ninth-unit-moment.model';

describe('Component Tests', () => {
  describe('NinthUnitMoment Management Update Component', () => {
    let comp: NinthUnitMomentUpdateComponent;
    let fixture: ComponentFixture<NinthUnitMomentUpdateComponent>;
    let service: NinthUnitMomentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthUnitMomentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthUnitMomentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthUnitMomentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthUnitMomentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthUnitMoment(123);
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
        const entity = new NinthUnitMoment();
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
