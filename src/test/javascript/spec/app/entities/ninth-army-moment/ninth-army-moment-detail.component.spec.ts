import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyMomentDetailComponent } from 'app/entities/ninth-army-moment/ninth-army-moment-detail.component';
import { NinthArmyMoment } from 'app/shared/model/ninth-army-moment.model';

describe('Component Tests', () => {
  describe('NinthArmyMoment Management Detail Component', () => {
    let comp: NinthArmyMomentDetailComponent;
    let fixture: ComponentFixture<NinthArmyMomentDetailComponent>;
    const route = ({ data: of({ ninthArmyMoment: new NinthArmyMoment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyMomentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthArmyMomentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthArmyMomentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthArmyMoment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthArmyMoment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
