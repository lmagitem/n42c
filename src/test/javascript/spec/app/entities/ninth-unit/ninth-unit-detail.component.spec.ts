import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthUnitDetailComponent } from 'app/entities/ninth-unit/ninth-unit-detail.component';
import { NinthUnit } from 'app/shared/model/ninth-unit.model';

describe('Component Tests', () => {
  describe('NinthUnit Management Detail Component', () => {
    let comp: NinthUnitDetailComponent;
    let fixture: ComponentFixture<NinthUnitDetailComponent>;
    const route = ({ data: of({ ninthUnit: new NinthUnit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthUnitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthUnitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthUnitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthUnit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthUnit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
