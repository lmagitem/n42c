import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthArmyUnitMomentComponent } from 'app/entities/ninth-army-unit-moment/ninth-army-unit-moment.component';
import { NinthArmyUnitMomentService } from 'app/entities/ninth-army-unit-moment/ninth-army-unit-moment.service';
import { NinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';

describe('Component Tests', () => {
  describe('NinthArmyUnitMoment Management Component', () => {
    let comp: NinthArmyUnitMomentComponent;
    let fixture: ComponentFixture<NinthArmyUnitMomentComponent>;
    let service: NinthArmyUnitMomentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthArmyUnitMomentComponent],
      })
        .overrideTemplate(NinthArmyUnitMomentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthArmyUnitMomentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthArmyUnitMomentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthArmyUnitMoment(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthArmyUnitMoments && comp.ninthArmyUnitMoments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
