import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyDetailComponent } from 'app/entities/ninth-army/ninth-army-detail.component';
import { NinthArmy } from 'app/shared/model/ninth-army.model';

describe('Component Tests', () => {
  describe('NinthArmy Management Detail Component', () => {
    let comp: NinthArmyDetailComponent;
    let fixture: ComponentFixture<NinthArmyDetailComponent>;
    const route = ({ data: of({ ninthArmy: new NinthArmy(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthArmyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthArmyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthArmy on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthArmy).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
