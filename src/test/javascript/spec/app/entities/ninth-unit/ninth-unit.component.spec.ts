import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthUnitComponent } from 'app/entities/ninth-unit/ninth-unit.component';
import { NinthUnitService } from 'app/entities/ninth-unit/ninth-unit.service';
import { NinthUnit } from 'app/shared/model/ninth-unit.model';

describe('Component Tests', () => {
  describe('NinthUnit Management Component', () => {
    let comp: NinthUnitComponent;
    let fixture: ComponentFixture<NinthUnitComponent>;
    let service: NinthUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthUnitComponent],
      })
        .overrideTemplate(NinthUnitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthUnitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthUnitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthUnit(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthUnits && comp.ninthUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
