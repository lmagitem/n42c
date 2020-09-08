import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyMomentUpdateComponent } from 'app/entities/ninth-army-moment/ninth-army-moment-update.component';
import { NinthArmyMomentService } from 'app/entities/ninth-army-moment/ninth-army-moment.service';
import { NinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';

describe('Component Tests', () => {
  describe('NinthArmyMoment Management Update Component', () => {
    let comp: NinthArmyMomentUpdateComponent;
    let fixture: ComponentFixture<NinthArmyMomentUpdateComponent>;
    let service: NinthArmyMomentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyMomentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthArmyMomentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthArmyMomentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthArmyMomentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthArmyMoment(123);
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
        const entity = new NinthArmyMoment();
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
