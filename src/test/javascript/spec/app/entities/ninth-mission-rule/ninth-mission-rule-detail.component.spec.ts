import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthMissionRuleDetailComponent } from 'app/entities/ninth-mission-rule/ninth-mission-rule-detail.component';
import { NinthMissionRule } from 'app/shared/model/ninth-mission-rule.model';

describe('Component Tests', () => {
  describe('NinthMissionRule Management Detail Component', () => {
    let comp: NinthMissionRuleDetailComponent;
    let fixture: ComponentFixture<NinthMissionRuleDetailComponent>;
    const route = ({ data: of({ ninthMissionRule: new NinthMissionRule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthMissionRuleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthMissionRuleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthMissionRuleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthMissionRule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthMissionRule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
