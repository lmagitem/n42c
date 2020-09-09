import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthObjectiveUpdateComponent } from 'app/entities/ninth-objective/ninth-objective-update.component';
import { NinthObjectiveService } from 'app/entities/ninth-objective/ninth-objective.service';
import { NinthObjective } from 'app/shared/model/ninth-objective.model';

describe('Component Tests', () => {
  describe('NinthObjective Management Update Component', () => {
    let comp: NinthObjectiveUpdateComponent;
    let fixture: ComponentFixture<NinthObjectiveUpdateComponent>;
    let service: NinthObjectiveService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthObjectiveUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthObjectiveUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthObjectiveUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthObjectiveService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthObjective(123);
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
        const entity = new NinthObjective();
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
