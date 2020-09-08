import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthStratagemUpdateComponent } from 'app/entities/localized-ninth-stratagem/localized-ninth-stratagem-update.component';
import { LocalizedNinthStratagemService } from 'app/entities/localized-ninth-stratagem/localized-ninth-stratagem.service';
import { LocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';

describe('Component Tests', () => {
  describe('LocalizedNinthStratagem Management Update Component', () => {
    let comp: LocalizedNinthStratagemUpdateComponent;
    let fixture: ComponentFixture<LocalizedNinthStratagemUpdateComponent>;
    let service: LocalizedNinthStratagemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthStratagemUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedNinthStratagemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthStratagemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthStratagemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedNinthStratagem(123);
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
        const entity = new LocalizedNinthStratagem();
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
