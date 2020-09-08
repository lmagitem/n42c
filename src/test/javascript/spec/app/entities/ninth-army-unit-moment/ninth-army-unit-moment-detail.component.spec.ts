import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyUnitMomentDetailComponent } from 'app/entities/ninth-army-unit-moment/ninth-army-unit-moment-detail.component';
import { NinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';

describe('Component Tests', () => {
  describe('NinthArmyUnitMoment Management Detail Component', () => {
    let comp: NinthArmyUnitMomentDetailComponent;
    let fixture: ComponentFixture<NinthArmyUnitMomentDetailComponent>;
    const route = ({ data: of({ ninthArmyUnitMoment: new NinthArmyUnitMoment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyUnitMomentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthArmyUnitMomentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthArmyUnitMomentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthArmyUnitMoment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthArmyUnitMoment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
