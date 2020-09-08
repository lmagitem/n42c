import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthMissionRuleComponent } from 'app/entities/ninth-mission-rule/ninth-mission-rule.component';
import { NinthMissionRuleService } from 'app/entities/ninth-mission-rule/ninth-mission-rule.service';
import { NinthMissionRule } from 'app/shared/model/ninth-mission-rule.model';

describe('Component Tests', () => {
  describe('NinthMissionRule Management Component', () => {
    let comp: NinthMissionRuleComponent;
    let fixture: ComponentFixture<NinthMissionRuleComponent>;
    let service: NinthMissionRuleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthMissionRuleComponent],
      })
        .overrideTemplate(NinthMissionRuleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthMissionRuleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthMissionRuleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthMissionRule(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthMissionRules && comp.ninthMissionRules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
