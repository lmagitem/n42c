import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthObjectiveDetailComponent } from 'app/entities/localized-ninth-objective/localized-ninth-objective-detail.component';
import { LocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';

describe('Component Tests', () => {
  describe('LocalizedNinthObjective Management Detail Component', () => {
    let comp: LocalizedNinthObjectiveDetailComponent;
    let fixture: ComponentFixture<LocalizedNinthObjectiveDetailComponent>;
    const route = ({ data: of({ localizedNinthObjective: new LocalizedNinthObjective(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthObjectiveDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedNinthObjectiveDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedNinthObjectiveDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localizedNinthObjective on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedNinthObjective).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
