import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthStratagemGroupDetailComponent } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group-detail.component';
import { NinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';

describe('Component Tests', () => {
  describe('NinthStratagemGroup Management Detail Component', () => {
    let comp: NinthStratagemGroupDetailComponent;
    let fixture: ComponentFixture<NinthStratagemGroupDetailComponent>;
    const route = ({ data: of({ ninthStratagemGroup: new NinthStratagemGroup(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthStratagemGroupDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthStratagemGroupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthStratagemGroupDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthStratagemGroup on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthStratagemGroup).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
