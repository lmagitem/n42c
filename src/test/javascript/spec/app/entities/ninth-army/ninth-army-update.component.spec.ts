import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyUpdateComponent } from 'app/entities/ninth-army/ninth-army-update.component';
import { NinthArmyService } from 'app/entities/ninth-army/ninth-army.service';
import { NinthArmy } from 'app/shared/model/ninth-army.model';

describe('Component Tests', () => {
  describe('NinthArmy Management Update Component', () => {
    let comp: NinthArmyUpdateComponent;
    let fixture: ComponentFixture<NinthArmyUpdateComponent>;
    let service: NinthArmyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthArmyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthArmyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthArmyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthArmy(123);
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
        const entity = new NinthArmy();
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
