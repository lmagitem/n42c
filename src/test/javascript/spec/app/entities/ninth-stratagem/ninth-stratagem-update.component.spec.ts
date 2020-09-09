import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthStratagemUpdateComponent } from 'app/entities/ninth-stratagem/ninth-stratagem-update.component';
import { NinthStratagemService } from 'app/entities/ninth-stratagem/ninth-stratagem.service';
import { NinthStratagem } from 'app/shared/model/ninth-stratagem.model';

describe('Component Tests', () => {
  describe('NinthStratagem Management Update Component', () => {
    let comp: NinthStratagemUpdateComponent;
    let fixture: ComponentFixture<NinthStratagemUpdateComponent>;
    let service: NinthStratagemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthStratagemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthStratagemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthStratagemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthStratagemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthStratagem(123);
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
        const entity = new NinthStratagem();
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
