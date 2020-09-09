import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthStratagemGroupUpdateComponent } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group-update.component';
import { NinthStratagemGroupService } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';
import { NinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';

describe('Component Tests', () => {
  describe('NinthStratagemGroup Management Update Component', () => {
    let comp: NinthStratagemGroupUpdateComponent;
    let fixture: ComponentFixture<NinthStratagemGroupUpdateComponent>;
    let service: NinthStratagemGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthStratagemGroupUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthStratagemGroupUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthStratagemGroupUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthStratagemGroupService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthStratagemGroup(123);
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
        const entity = new NinthStratagemGroup();
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
