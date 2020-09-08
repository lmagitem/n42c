import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthMissionRuleDetailComponent } from 'app/entities/localized-ninth-mission-rule/localized-ninth-mission-rule-detail.component';
import { LocalizedNinthMissionRule } from 'app/shared/model/localized-ninth-mission-rule.model';

describe('Component Tests', () => {
  describe('LocalizedNinthMissionRule Management Detail Component', () => {
    let comp: LocalizedNinthMissionRuleDetailComponent;
    let fixture: ComponentFixture<LocalizedNinthMissionRuleDetailComponent>;
    const route = ({ data: of({ localizedNinthMissionRule: new LocalizedNinthMissionRule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthMissionRuleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedNinthMissionRuleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedNinthMissionRuleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localizedNinthMissionRule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedNinthMissionRule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
