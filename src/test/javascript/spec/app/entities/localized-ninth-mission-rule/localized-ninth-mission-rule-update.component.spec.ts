import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthMissionRuleUpdateComponent } from 'app/entities/localized-ninth-mission-rule/localized-ninth-mission-rule-update.component';
import { LocalizedNinthMissionRuleService } from 'app/entities/localized-ninth-mission-rule/localized-ninth-mission-rule.service';
import { LocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';

describe('Component Tests', () => {
  describe('LocalizedNinthMissionRule Management Update Component', () => {
    let comp: LocalizedNinthMissionRuleUpdateComponent;
    let fixture: ComponentFixture<LocalizedNinthMissionRuleUpdateComponent>;
    let service: LocalizedNinthMissionRuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthMissionRuleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedNinthMissionRuleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthMissionRuleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthMissionRuleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedNinthMissionRule(123);
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
        const entity = new LocalizedNinthMissionRule();
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
