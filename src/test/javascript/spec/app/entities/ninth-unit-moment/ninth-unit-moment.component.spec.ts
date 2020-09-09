import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthUnitMomentComponent } from 'app/entities/ninth-unit-moment/ninth-unit-moment.component';
import { NinthUnitMomentService } from 'app/entities/ninth-unit-moment/ninth-unit-moment.service';
import { NinthUnitMoment } from 'app/shared/model/ninth-unit-moment.model';

describe('Component Tests', () => {
  describe('NinthUnitMoment Management Component', () => {
    let comp: NinthUnitMomentComponent;
    let fixture: ComponentFixture<NinthUnitMomentComponent>;
    let service: NinthUnitMomentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthUnitMomentComponent],
      })
        .overrideTemplate(NinthUnitMomentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthUnitMomentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthUnitMomentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthUnitMoment(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthUnitMoments && comp.ninthUnitMoments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
