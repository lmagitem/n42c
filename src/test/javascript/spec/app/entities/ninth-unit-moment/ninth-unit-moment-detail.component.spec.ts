import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthUnitMomentDetailComponent } from 'app/entities/ninth-unit-moment/ninth-unit-moment-detail.component';
import { NinthUnitMoment } from 'app/shared/model/ninth-unit-moment.model';

describe('Component Tests', () => {
  describe('NinthUnitMoment Management Detail Component', () => {
    let comp: NinthUnitMomentDetailComponent;
    let fixture: ComponentFixture<NinthUnitMomentDetailComponent>;
    const route = ({ data: of({ ninthUnitMoment: new NinthUnitMoment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthUnitMomentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthUnitMomentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthUnitMomentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthUnitMoment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthUnitMoment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
