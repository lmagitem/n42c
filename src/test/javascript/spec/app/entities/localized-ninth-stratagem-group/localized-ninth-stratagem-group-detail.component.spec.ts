import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthStratagemGroupDetailComponent } from 'app/entities/localized-ninth-stratagem-group/localized-ninth-stratagem-group-detail.component';
import { LocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';

describe('Component Tests', () => {
  describe('LocalizedNinthStratagemGroup Management Detail Component', () => {
    let comp: LocalizedNinthStratagemGroupDetailComponent;
    let fixture: ComponentFixture<LocalizedNinthStratagemGroupDetailComponent>;
    const route = ({ data: of({ localizedNinthStratagemGroup: new LocalizedNinthStratagemGroup(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthStratagemGroupDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedNinthStratagemGroupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedNinthStratagemGroupDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localizedNinthStratagemGroup on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedNinthStratagemGroup).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
