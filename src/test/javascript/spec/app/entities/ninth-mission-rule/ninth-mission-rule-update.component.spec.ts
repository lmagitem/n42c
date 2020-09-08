import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthMissionRuleUpdateComponent } from 'app/entities/ninth-mission-rule/ninth-mission-rule-update.component';
import { NinthMissionRuleService } from 'app/entities/ninth-mission-rule/ninth-mission-rule.service';
import { NinthMissionRule } from 'app/shared/model/ninth-mission-rule.model';

describe('Component Tests', () => {
  describe('NinthMissionRule Management Update Component', () => {
    let comp: NinthMissionRuleUpdateComponent;
    let fixture: ComponentFixture<NinthMissionRuleUpdateComponent>;
    let service: NinthMissionRuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthMissionRuleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthMissionRuleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthMissionRuleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthMissionRuleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthMissionRule(123);
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
        const entity = new NinthMissionRule();
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
