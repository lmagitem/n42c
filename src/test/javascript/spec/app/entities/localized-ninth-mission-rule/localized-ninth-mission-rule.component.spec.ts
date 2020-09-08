import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthMissionRuleComponent } from 'app/entities/localized-ninth-mission-rule/localized-ninth-mission-rule.component';
import { LocalizedNinthMissionRuleService } from 'app/entities/localized-ninth-mission-rule/localized-ninth-mission-rule.service';
import { LocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';

describe('Component Tests', () => {
  describe('LocalizedNinthMissionRule Management Component', () => {
    let comp: LocalizedNinthMissionRuleComponent;
    let fixture: ComponentFixture<LocalizedNinthMissionRuleComponent>;
    let service: LocalizedNinthMissionRuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthMissionRuleComponent],
      })
        .overrideTemplate(LocalizedNinthMissionRuleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthMissionRuleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthMissionRuleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedNinthMissionRule(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedNinthMissionRules && comp.localizedNinthMissionRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
