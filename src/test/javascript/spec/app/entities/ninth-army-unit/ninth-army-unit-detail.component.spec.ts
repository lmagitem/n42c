import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyUnitDetailComponent } from 'app/entities/ninth-army-unit/ninth-army-unit-detail.component';
import { NinthArmyUnit } from 'app/shared/model/ninth-army-unit.model';

describe('Component Tests', () => {
  describe('NinthArmyUnit Management Detail Component', () => {
    let comp: NinthArmyUnitDetailComponent;
    let fixture: ComponentFixture<NinthArmyUnitDetailComponent>;
    const route = ({ data: of({ ninthArmyUnit: new NinthArmyUnit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyUnitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthArmyUnitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthArmyUnitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthArmyUnit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthArmyUnit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
