import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthMissionUpdateComponent } from 'app/entities/localized-ninth-mission/localized-ninth-mission-update.component';
import { LocalizedNinthMissionService } from 'app/entities/localized-ninth-mission/localized-ninth-mission.service';
import { LocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';

describe('Component Tests', () => {
  describe('LocalizedNinthMission Management Update Component', () => {
    let comp: LocalizedNinthMissionUpdateComponent;
    let fixture: ComponentFixture<LocalizedNinthMissionUpdateComponent>;
    let service: LocalizedNinthMissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthMissionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedNinthMissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthMissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthMissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedNinthMission(123);
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
        const entity = new LocalizedNinthMission();
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
