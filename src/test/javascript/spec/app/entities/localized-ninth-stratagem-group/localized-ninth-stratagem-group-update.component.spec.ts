import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthStratagemGroupUpdateComponent } from 'app/entities/localized-ninth-stratagem-group/localized-ninth-stratagem-group-update.component';
import { LocalizedNinthStratagemGroupService } from 'app/entities/localized-ninth-stratagem-group/localized-ninth-stratagem-group.service';
import { LocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';

describe('Component Tests', () => {
  describe('LocalizedNinthStratagemGroup Management Update Component', () => {
    let comp: LocalizedNinthStratagemGroupUpdateComponent;
    let fixture: ComponentFixture<LocalizedNinthStratagemGroupUpdateComponent>;
    let service: LocalizedNinthStratagemGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthStratagemGroupUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedNinthStratagemGroupUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthStratagemGroupUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthStratagemGroupService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedNinthStratagemGroup(123);
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
        const entity = new LocalizedNinthStratagemGroup();
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
