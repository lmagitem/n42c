import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthMissionUpdateComponent } from 'app/entities/ninth-mission/ninth-mission-update.component';
import { NinthMissionService } from 'app/entities/ninth-mission/ninth-mission.service';
import { NinthMission } from 'app/shared/model/ninth-mission.model';

describe('Component Tests', () => {
  describe('NinthMission Management Update Component', () => {
    let comp: NinthMissionUpdateComponent;
    let fixture: ComponentFixture<NinthMissionUpdateComponent>;
    let service: NinthMissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthMissionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthMissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthMissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthMissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthMission(123);
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
        const entity = new NinthMission();
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
