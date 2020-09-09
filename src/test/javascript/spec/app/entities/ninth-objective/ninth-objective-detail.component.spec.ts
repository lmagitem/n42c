import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthObjectiveDetailComponent } from 'app/entities/ninth-objective/ninth-objective-detail.component';
import { NinthObjective } from 'app/shared/model/ninth-objective.model';

describe('Component Tests', () => {
  describe('NinthObjective Management Detail Component', () => {
    let comp: NinthObjectiveDetailComponent;
    let fixture: ComponentFixture<NinthObjectiveDetailComponent>;
    const route = ({ data: of({ ninthObjective: new NinthObjective(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthObjectiveDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthObjectiveDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthObjectiveDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthObjective on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthObjective).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
