import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyUnitComponent } from 'app/entities/ninth-army-unit/ninth-army-unit.component';
import { NinthArmyUnitService } from 'app/entities/ninth-army-unit/ninth-army-unit.service';
import { NinthArmyUnit } from 'app/shared/model/ninth-army-unit.model';

describe('Component Tests', () => {
  describe('NinthArmyUnit Management Component', () => {
    let comp: NinthArmyUnitComponent;
    let fixture: ComponentFixture<NinthArmyUnitComponent>;
    let service: NinthArmyUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyUnitComponent],
      })
        .overrideTemplate(NinthArmyUnitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthArmyUnitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthArmyUnitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthArmyUnit(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthArmyUnits && comp.ninthArmyUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
